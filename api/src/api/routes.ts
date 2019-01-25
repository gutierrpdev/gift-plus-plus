import * as Router from 'koa-router';
import { checkUrl, checkBody } from '../util-libs/validatation';
import { Api } from './';


export type ApiRouter = Router<Api.StateT, Api.CustomT>;
export const router: ApiRouter = new Router();


router.get('/ping', async (ctx) => {
  ctx.body = { pong: true };
});


// TODO: DO NOT TRUST URLS PASSED IN. We should have some kind of temp asset id
// which we turn into a url or something like that.

interface CreateGiftRequest {
  id: string,
  museumId: string,
  accountId: string,
  senderName: string,
  recipientName: string,
  recipientGreeting: string,
}

router.post('/gift', async (ctx) => {
  const createGiftRequest = await checkBody<CreateGiftRequest>(ctx, {
    properties: {
      id: { type: 'string', format: 'uuid' },
      museumId: { type: 'string', format: 'uuid' },
      accountId: { type: 'string', format: 'uuid' },
      senderName: { type: 'string', minLength: 1 },
      recipientName: { type: 'string', minLength: 1 },
      recipientGreeting: { type: 'string', format: 'uri' },
    },
    required: ['id', 'museumId', 'accountId', 'senderName', 'recipientName', 'recipientGreeting'],
  });

  ctx.body = createGiftRequest;
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
