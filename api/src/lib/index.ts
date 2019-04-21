import * as Knex from 'knex';
import { prepareDb } from './db';
import { GiftService } from './services/gift';
import { StorageService } from './services/storage';
import { TranscodeService } from './services/transcode';

export interface Config {
  environment: string;
  sqlUri: string;
  awsAccessKey: string;
  awsSecretAccessKey: string;
  awsBucket: string;
  awsRegion: string;
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
    return new Lib(config, db);
  }


  // ========
  // Instance
  // ========

  public gift: GiftService;
  public storage: StorageService;
  public transcode: TranscodeService;

  /**
   * Private constructor
   */
  private constructor(
    config: Config,
    private db: Knex,
  ) {

    this.gift = new GiftService(db);

    this.storage = new StorageService({
      awsAccessKey: config.awsAccessKey,
      awsSecretAccessKey: config.awsSecretAccessKey,
      awsBucket: config.awsBucket,
      awsRegion: config.awsRegion,
      prefix: config.environment,
    });

    this.transcode = new TranscodeService();
  }


  public async close(): Promise<void> {
    await this.db.destroy();
  }
}
