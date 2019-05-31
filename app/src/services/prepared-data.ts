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
  senderName: 'Brighton Museum',
  recipientName: 'visitor',
  parts: [
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-1-photo.6046a68f.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-1-note.c4ff803e.m4a',
      clue: 'Find the cabinet of Japanese inspired furniture',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-photo.863ba708.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-note.cd932aec.m4a',
      clue: 'Look among the chairs by the  entrance',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-photo.819aeecd.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-note.2ea33502.m4a',
      clue: 'Search for the glass case of figurines',
    },
  ],
});


/* tslint:enable max-line-length */
