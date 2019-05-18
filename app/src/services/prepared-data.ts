import uuidv5 from 'uuid/v5';
import { GetGiftResponse } from '../common/api-schema';

export const preparedGifts = new Map<string, GetGiftResponse>();

/* tslint:disable max-line-length */

/**
 * Brighton Museum curated Gift
 *
 * ID: 031a7ccc-4451-5139-9942-262bfed975d2
 */
preparedGifts.set(uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL), {
  id: uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL),
  kind: 'MuseumGift',
  museumId: uuidv5('https://api.thegift.app/museum/brighton-museum', uuidv5.URL),
  accountId: uuidv5('https://api.thegift.app/account/brighton-museum', uuidv5.URL),
  senderName: 'Brighton Museum',
  recipientName: ' ',  // DO NOT remove the empty space, it's required for validation
  recipientGreeting: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/1-second-of-silence.m4a',
  parts: [
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-031a7ccc/part-1-photo.6046a68e.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-031a7ccc/part-1-note.c3ff803d.m4a',
      clue: 'Walk past to the back of the museum and turn around.',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-031a7ccc/part-2-photo.863ba709.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-031a7ccc/part-2-note.bd932aeb.m4a',
      clue: 'Go through the little door next to stairs on the ground floor.',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-031a7ccc/part-3-photo.819aeecb.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-031a7ccc/part-3-note.2fa33501.m4a',
      clue: 'Find the room of paintings off the mezzanine upstairs.',
    },
  ],
});


/* tslint:enable max-line-length */
