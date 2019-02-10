import * as Knex from 'knex';
import { types as pgTypes } from 'pg';
import { getLogger } from '../util-libs/logging';

const logger = getLogger('lib:db');


/**
 * Prepare a db client (including running any pending migrations).
 *
 * @param sqlUri The connection details
 * @return A prepared db instance
 */
export async function prepareDb(sqlUri: string): Promise<Knex> {
  const parsedSqlUri = sqlUri.split('://');
  if (parsedSqlUri.length !== 2) throw new Error('Bad SQL URI');

  const config: Knex.Config = {
    client: parsedSqlUri[0],
    connection: parsedSqlUri[1],
  };

  // sqlite3 specific
  if (config.client === 'sqlite3') {
    config.useNullAsDefault = true;
  }

  // postgres specific
  if (config.client === 'postgresql') {
    // Treat postgres int8 (64bit) as normal js integers rather than strings.
    // (see: https://github.com/brianc/node-pg-types)
    // WARNING: if we get query results with an int8 value < jsmax (53bit) this
    // would be a disaster.
    pgTypes.setTypeParser(20, (val) => parseInt(val, 10));
  }

  const db = Knex(config);

  try {
    logger.debug('Running pending DB migrations...');
    const [batchNumber, migrations] = await db.migrate.latest();

    if (migrations.length) {
      logger.info(`Ran ${migrations.length} DB migrations (batch ${batchNumber})`);
    } else {
      logger.debug('No pending DB migrations');
    }
  } catch (err) {
    db.destroy();
    throw err;
  }

  return db;
}
