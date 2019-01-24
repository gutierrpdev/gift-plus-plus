import * as Router from 'koa-router';
import { validateParams } from '../util-libs/validatation';

import { Api } from './';

import * as Ajv from 'ajv';


export type ApiRouter = Router<Api.StateT, Api.CustomT>;

export const router: ApiRouter = new Router();


router.get('/ping', async (ctx) => {
  ctx.body = { pong: true };
});


router.get('/gift/:giftId', async (ctx) => {
  const { giftId } = validateParams<{
    giftId: string,
  }>({
    giftId: { type: 'string', format: 'uuid' },
  }, ctx);

  ctx.body = {
    giftId,
  };
});
