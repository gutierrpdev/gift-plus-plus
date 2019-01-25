import * as Router from 'koa-router';
import { checkUrl } from '../util-libs/validatation';

import { Api } from './';

export type ApiRouter = Router<Api.StateT, Api.CustomT>;

export const router: ApiRouter = new Router();


router.get('/ping', async (ctx) => {
  ctx.body = { pong: true };
});


router.get('/gift/:giftId', async (ctx) => {
  const { giftId } = checkUrl(ctx, 'giftId');
  const gift = await ctx.lib.gift.findById(giftId);

  if (!gift) {
    ctx.throw(404);
    return;
  }

  ctx.body = gift;
});
