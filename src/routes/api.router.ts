import * as express from 'express';
import { userRouter } from './user.router';
import { betRouter } from '@base/routes/bet.router';

export interface IRoute {
  url: string;
  router: express.Router;
}

export class ApiRouter {
  constructor(private router: express.Router, private routes: IRoute[]) {
    this.setupApiRoutes(routes);
  }

  get apiRouter() {
    return this.router;
  }

  public addApiRoute(url: string, router: express.Router) {
    this.router.use(url, router);
  }

  public setupApiRoutes(routes: IRoute[]) {
    routes.forEach((route) => {
      this.addApiRoute(route.url, route.router);
    });
  }
}
const apiRoutes: IRoute[] = [
  { url: '', router: userRouter },
  { url: '/bet', router: betRouter },
];

export const apiRouter = new ApiRouter(express.Router(), apiRoutes).apiRouter;
