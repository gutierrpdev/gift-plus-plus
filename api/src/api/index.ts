import * as cors from '@koa/cors';
import { JsonApi } from '../util-libs/json-api';
import { Lib } from '../lib';
import { router } from './routes';


export interface Config {
  lib: Lib;
  corsAllowedOrigins: string;
}


class Api extends JsonApi<Api.StateT, Api.CustomT> {

  // ======
  // Static
  // ======

  /**
   * Create a new API
   */
  public static async create(config: Config): Promise<Api> {
    const api = new Api(config);
    return api;
  }


  // ========
  // Instance
  // ========

  /**
   * Private constructor
   */
  private constructor(config: Config) {
    super({ name: 'api' });

    this.context.lib = config.lib;

    // Enable CORS
    this.use(cors({
      origin: config.corsAllowedOrigins,
      keepHeadersOnError: false,
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
      maxAge: 60 * 60 * 24,
    }));

    // Attach our routes
    this.use(router.routes());
    this.use(router.allowedMethods());
  }
}


declare namespace Api {
  interface StateT extends JsonApi.StateT {}

  interface CustomT extends JsonApi.CustomT {
    lib: Lib;
  }
}

export { Api };
