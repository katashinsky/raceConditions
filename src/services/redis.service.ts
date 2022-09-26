import { createClient } from 'redis';
import { promisify } from 'util';
import * as fs from 'fs';
import * as path from 'path';

export class RedisService {
  private redisSet: (key: any, data: any) => Promise<any>;
  private redisGet: (key: any) => Promise<any>;
  public client: any;

  public async connect(): Promise<void> {
    this.client = createClient({ url: `redis://localhost:${process.env.REDIS_PORT}`, legacyMode: true });

    this.client.on('error', (err: any) => console.log('Redis Client Error', err));

    await this.client.connect();

    this.redisSet = promisify(this.client.set).bind(this.client);
    this.redisGet = promisify(this.client.get).bind(this.client);
  }

  public async setValue(key: any, value: any) {
    await this.redisSet(key, JSON.stringify(value));
  }

  public async getValue(key: any): Promise<any> {
    const value = await this.redisGet(key);
    return JSON.parse(value);
  }

  public async setValueSafe(key: any, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const { cb, script } = this.clientEval(resolve, reject, 'setValueByKey.lua', 'SET');
      this.client.eval(script, 2, key, value, cb);
    });
  }

  public async getValueSafe(key: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const { cb, script } = this.clientEval(resolve, reject, 'getValueByKey.lua', 'GET');
      this.client.eval(script, 1, key, cb);
    });
  }

  public async setDefaultFlag(key: any): Promise<string> {
    return new Promise((resolve, reject) => {
      const { cb, script } = this.clientEval(resolve, reject, 'setDefaultFlag.lua', 'SET_DEFAULT_FLAG');
      this.client.eval(script, 1, key, cb);
    });
  }

  public async getWithSwitcher(key: any, value: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const { cb, script } = this.clientEval(resolve, reject, 'getWithSwitcher.lua', 'GET_WITH_SWITCHER');
      this.client.eval(script, 1, key, value, cb);
    });
  }

  private clientEval(
    resolve: (err: any) => void,
    reject: (value: any) => void,
    fileName: string,
    logName: string,
  ): { cb: (err: any, value: any) => void; script: string } {
    const script = fs.readFileSync(path.join(__dirname, '../utils/lua_scripts', fileName), { encoding: 'utf8' });

    return {
      script,
      cb: (err: any, value: any) => {
        if (err) {
          reject(err);
        }
        console.log(`successfully ${logName} new value to ${value}`);
        resolve(value);
      },
    };
  }
}

export const redisService = new RedisService();
