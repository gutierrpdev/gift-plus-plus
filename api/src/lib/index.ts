import * as Knex from 'knex';
import { prepareDb } from './db';
import { GiftService } from './services/gift';

export interface Config {
  sqlUri: string;
}

export class Lib {

  // ======
  // Static
  // ======

  /**
   * Create a new Library
   */
  public static async create(config: Config): Promise<Lib> {
    const db = await prepareDb(config.sqlUri);
    return new Lib(db);
  }


  // ========
  // Instance
  // ========

  public gift: GiftService;

  /**
   * Private constructor
   */
  private constructor(
    private db: Knex,
  ) {
    this.gift = new GiftService(db);
  }


  public async close(): Promise<void> {
    await this.db.destroy();
  }
}
