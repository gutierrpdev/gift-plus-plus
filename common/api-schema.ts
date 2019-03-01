export interface GetGiftResponse {
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

export const getGiftResponseSchema = {
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

// For now, these are all the same...

export type CreateGiftRequest = GetGiftResponse;
export const createGiftRequestSchema = getGiftResponseSchema;

export type CreateGiftResponse = GetGiftResponse;
export const createGiftResponseSchema = getGiftResponseSchema;
