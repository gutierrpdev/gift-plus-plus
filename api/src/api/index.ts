import { JsonApi } from '../util-libs/json-api';
import { Lib } from '../lib';
import { router } from './routes';


export interface Config {
  lib: Lib;
}


class Api extends JsonApi<Api.StateT, Api.CustomT> {

  // ======
  // Static
  // ======

  /**
   * Create a new API
   */
  public static async create(config: Config): Promise<Api> {
    const api = new Api(config.lib);
    return api;
  }


  // ========
  // Instance
  // ========

  /**
   * Private constructor
   */
  private constructor(lib: Lib) {
    super({ name: 'api' });

    this.context.lib = lib;

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
