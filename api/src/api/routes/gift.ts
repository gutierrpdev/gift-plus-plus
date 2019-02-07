import { checkUrl, checkBody } from '../../util-libs/validatation';
import { ApiRouter } from './router';

export const router = new ApiRouter();


// TODO: DO NOT TRUST URLS PASSED IN. We should have some kind of temp asset id
// which we turn into a url or something like that.

interface CreateGiftRequest {
  id: string;
  kind: 'MuseumGift' | 'PersonalGift';
  museumId: string;
  accountId: string;
  senderName: string;
  recipientName: string;
  recipientGreeting: string;
  parts: Array<{
    photo: string;
    note: string;
    clue: string;
  }>;
}

const createGiftSchema = {
  properties: {
    id: { type: 'string', format: 'uuid' },
    kind: { type: 'string', enum: ['MuseumGift', 'PersonalGift'] },
    museumId: { type: 'string', format: 'uuid' },
    accountId: { type: 'string', format: 'uuid' },
    senderName: { type: 'string', minLength: 1 },
    recipientName: { type: 'string', minLength: 1 },
    recipientGreeting: { type: 'string', format: 'uri' },
    parts: { type: 'array', minItems: 1, maxItems: 3, items: {
      type: 'object',
      properties: {
        photo: { type: 'string', format: 'uri' },
        note: { type: 'string', format: 'uri' },
        clue: { type: 'string', minLength: 1 },
      },
      required: [
        'photo',
        'note',
        'clue',
      ],
    }},
  },
  required: [
    'id',
    'kind',
    'museumId',
    'accountId',
    'senderName',
    'recipientName',
    'recipientGreeting',
    'parts',
  ],
};


router.post('/gift', async (ctx) => {
  const body = await checkBody<CreateGiftRequest>(ctx, createGiftSchema);
  const result = await ctx.lib.gift.create(body);

  if (result.kind === 'Success') {
    ctx.status = 201;
    ctx.body = body;
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

  ctx.body = gift;
});


/**
 *  Simple Typescript helper to ensure we haven't accidentally missed possible
 *  cases while doing switch statements / fall-through if statements etc.
 */
export function assertNever(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}
