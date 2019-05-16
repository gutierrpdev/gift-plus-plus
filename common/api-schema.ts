// =====================================================================
//                          PreparedUpload
// =====================================================================

export interface CreatePreparedUploadRequest {
  mimeType: string;
}

export const createPreparedUploadRequestSchema = {
  properties: {
    mimeType: { type: 'string', minLength: 1 },
  },
  required: [
    'mimeType',
  ],
};


export interface CreatePreparedUploadResponse {
  postUrl: string;
  postFields: { [key: string]: string; };
  fileName: string;
  fileUrl: string;
  fileType: string;
}

export const createPreparedUploadResponseSchema = {
  properties: {
    postUrl: { type: 'string', minLength: 1 },
    postFields:  {
      type: 'object',
      properties: {},
      additionalProperties: { type: 'string' },
    },
    fileName: { type: 'string', minLength: 1 },
    fileUrl: { type: 'string', minLength: 1 },
    fileType: { type: 'string', minLength: 1 },
  },
  required: [
    'postUrl',
    'postFields',
    'fileName',
    'fileUrl',
    'fileType',
  ],
};



// =====================================================================
//                              Gift
// =====================================================================

// --------
// Get Gift
// --------

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
        clue: { type: 'string' },
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

// -----------
// Create Gift
// -----------

export interface CreateGiftRequest {
  id: string;
  museumId: string;
  senderName: string;
  recipientName: string;
  recipientGreeting: string;
  parts: Array<{
    photo: string;
    note: string;
    clue: string;
  }>;
}

export const createGiftRequestSchema = {
  properties: {
    id: { type: 'string', format: 'uuid' },
    museumId: { type: 'string', format: 'uuid' },
    senderName: { type: 'string', minLength: 1 },
    recipientName: { type: 'string', minLength: 1 },
    recipientGreeting: { type: 'string', minLength: 1 },
    parts: { type: 'array', minItems: 1, maxItems: 3, items: {
      type: 'object',
      properties: {
        photo: { type: 'string', minLength: 1 },
        note: { type: 'string', minLength: 1 },
        clue: { type: 'string' },
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
    'museumId',
    'senderName',
    'recipientName',
    'recipientGreeting',
    'parts',
  ],
};

export type CreateGiftResponse = GetGiftResponse;
export const createGiftResponseSchema = getGiftResponseSchema;
