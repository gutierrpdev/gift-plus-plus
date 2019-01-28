import { Server } from 'http';
import { Api } from '../src/api';
import { Lib } from '../src/lib';
import { config } from '../src/config';

// Singleton store of all components we've started that need to be shutdown.
type ShutdownableComponent = Api | Lib | Server;
const runningComponents: ShutdownableComponent[] = [];

/**
 * Prepare system components
 *
 * Helper function to instansiate the components we use in the system
 * (similar to what main.ts does).
 *
 * @returns { api, lib, server } An object with the prepared components
 */
export async function prepareComponents() {
  const lib = await Lib.create(config);
  runningComponents.push(lib);

  const api = await Api.create({ lib });
  runningComponents.push(api);

  const server: Server = await new Promise((res, rej) => {
    const s = api.listen();
    s.once('listening', () => res(s));
    s.once('error', rej);
  });
  runningComponents.push(server);

  // Hack: Clear the DB
  // TODO: Put this somewhere nicer.
  // TODO: UnHack
  await Promise.all(['gift'].map((t) => (lib as any).db(t).truncate()));

  return {
    api,
    lib,
    server,
  };
}

/**
 * Shutdown the currently running compoents
 */
export async function shutdownComponents() {
  runningComponents.forEach((c) => c.close());
}
