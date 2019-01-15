export interface Config {}

export class Lib {

  // ======
  // Static
  // ======

  /**
   * Create a new Library
   */
  public static async create(config: Config): Promise<Lib> {
    const lib = new Lib();
    return lib;
  }


  // ========
  // Instance
  // ========

  /**
   * Private constructor
   */
  private constructor() {}


  public async close(): Promise<void> {} // tslint:disable-line no-empty
}
