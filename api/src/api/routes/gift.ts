import {
  CreateGiftRequest,
  createGiftRequestSchema,
  CreateGiftResponse,
  GetGiftResponse,
} from '../../common/api-schema';
import { checkUrl, checkBody } from '../../util-libs/validatation';
import { ApiRouter } from './router';

export const router = new ApiRouter();


router.post('/gift', async (ctx) => {
  const body = await checkBody<CreateGiftRequest>(ctx, createGiftRequestSchema);
  const result = await ctx.lib.gift.create(body);

  if (result.kind === 'Success') {
    ctx.status = 201;
    (ctx as { body: CreateGiftResponse }).body = body;
    return;
  }

  if (result.kind === 'IdAlreadyExists') {
    ctx.throw(409, { error: 'That gift ID already exists' });
    return;
  }

  assertNever(result);
});


router.get('/gift/:giftId', async (ctx) => {
  const { giftId } = checkUrl(ctx, 'giftId');

  const gift = await ctx.lib.gift.findById(giftId);

  if (!gift) {
    ctx.throw(404);
    return;
  }

  (ctx as { body: GetGiftResponse }).body = gift;
});


/**
 *  Simple Typescript helper to ensure we haven't accidentally missed possible
 *  cases while doing switch statements / fall-through if statements etc.
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}
