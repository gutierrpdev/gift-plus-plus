import * as Router from 'koa-router';
import { Api } from '../';

import { router as giftRouter } from './gift';

export type ApiRouter = Router<Api.StateT, Api.CustomT>;
export const router: ApiRouter = new Router();


router.get('/ping', async (ctx) => {
  ctx.body = { pong: true };
});

router.use(giftRouter.routes());
