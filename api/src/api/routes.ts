import * as Router from 'koa-router';
import { Api } from  './';

export type ApiRouter = Router<Api.StateT, Api.CustomT>;

export const router: ApiRouter = new Router();

router.get('/ping', async (ctx) => {
  ctx.body = { pong: true };
});
