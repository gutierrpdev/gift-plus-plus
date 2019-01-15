import { JsonApi } from '../util-libs/json-api';
import { Lib } from '../lib';
import { router } from './routes';


export interface Config {
  lib: Lib;
}


interface ApiContext {
  lib: Lib;
}


class Api extends JsonApi<{}, ApiContext> {

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


export { Api };
