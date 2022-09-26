import { env } from '@base/utils/env';

export const appConfig = {
  node: env('NODE_ENV') || 'development',
  name: env('APP_NAME'),
  port: Number(env('APP_PORT')),
};
