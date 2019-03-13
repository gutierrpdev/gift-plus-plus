/**
 * The config module.
 *
 * This module is responsible for obtaining and parsing any necessary
 * configuration.  It is the responsibility of this module to fail
 * hard and fast if any required config is missing.  Else the bugs
 * will probably just appear in production when you least expect it.
 * That wouldn't be good.
 *
 * All config which may vary between environments (read: pretty much
 * everything) should be provided as either environment variables or a
 * `.env` file -- which will be parsed by this module.
 */

// Note to self: Try using good-env rather than dotenv in the future
// (looks clean and simple).  Or envalid.

import * as dotenv from 'dotenv';

// Read from a `.env` file.
dotenv.config();

class ConfigError extends Error {
  public name = 'ConfigError';
}


// =====================================================================

// ================
// Config Structure
// ================

// This is where all config should be defined.  Any required
// configuration ought to rely on `readOrThrow` to ensure we fail
// hard and fast.

export interface Config {
  environment: string;
  host: string;
  port: number;
  sqlUri: string;
  corsAllowedOrigins: string;
}


export const config: Config = {
  environment: readAsString('ENVIRONMENT'),
  host: readAsString('HOST'),
  port: readAsInt('PORT'),
  sqlUri: readAsString('SQL_URI'),
  corsAllowedOrigins: readAsString('CORS_ALLOWED_ORIGINS'),
};

// =====================================================================



// =======
// Helpers
// =======

function readAsString(name: string): string {
  return readOrThrow(name);
}

// function readAsBool(name: string): boolean {
//   const val = readOrThrow(name).toLowerCase();
//   if (val === 'true') return true;
//   if (val === 'false') return false;
//   throw new ConfigError(`Invalid value: ${name}`);
// }

function readAsInt(name: string): number {
  return parseInt(readOrThrow(name), 10);
}

function readOrThrow(name: string): string {
  const val = process.env[name];

  if (val === undefined || val.trim() === '') {
    throw new ConfigError(`Required value missing: ${name}`);
  }

  return val.trim();
}
