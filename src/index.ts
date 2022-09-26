import { fixModuleAlias } from "./utils/moduleAlias";
fixModuleAlias(__dirname);

import { appConfig } from "@base/config/app";
import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import { apiRouter } from "@base/routes/api.router";
import mongoose from "mongoose";
import { redisService } from "@base/services/redis.service";


export class App {
  private app: Application = express();
  private port: number = appConfig.port;

  public constructor() {
    this.bootstrap();
  }

  public async bootstrap() {
    await this.mongooseCreateConnection();
    await this.redisCreateConnection();
    this.setupMiddlewares();
    this.registerDefaultHomePage();
    this.register404Page();
    this.registerErrorHandler();
  }

  private async mongooseCreateConnection() {
    try {
      await mongoose.connect(`mongodb://localhost:${process.env.MONGODB_PORT}/${process.env.MONGODB_NAME}`);
    } catch (error) {
      console.log('Cannot connect to database: ', error);
    }
  }

  private async redisCreateConnection() {
    try {
      await redisService.connect();
    } catch (error) {
      console.log('Cannot connect to redis: ', error);
    }
  }

  private setupMiddlewares() {
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
  }

  private registerDefaultHomePage() {
    this.app.get('/', (req: express.Request, res) => {
      res.json({
        title: appConfig.name,
        mode: appConfig.node,
        date: new Date(),
      });
    });

    this.app.use(apiRouter);
    this.app.listen(this.port, () => console.log(`🚀 Server started at http://localhost:${this.port}\n🚨️ Environment: ${process.env.NODE_ENV}`));
  }

  private register404Page() {
    this.app.get('*', function (req, res) {
      res.status(404).send({ status: 404, message: 'Page Not Found!' });
    });
  }

  private registerErrorHandler() {
    this.app.use((err: any, req: Request, res: Response) => {
      res.status(err.status || 500);
      res.json({
        message: err.message,
      });
    });
  }
}

new App();
