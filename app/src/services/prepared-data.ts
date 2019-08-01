import uuidv5 from 'uuid/v5';
import { GetGiftResponse } from '../common/api-schema';

export const preparedGifts = new Map<string, GetGiftResponse>();

/* tslint:disable max-line-length */


// =====
// GIFTS
// =====

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
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-note.cd932aee.m4a',
      clue: 'Look among the chairs by the  entrance',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-photo.819aeecd.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-note.2ea33504.m4a',
      clue: 'Search for the glass case of figurines',
    },
  ],
});


/**
 * Munch Museum curated Gift
 *
 * ID: d9a99419-a5e1-5ba7-9ed0-7b0006eae213
 */
preparedGifts.set(uuidv5('https://api.thegift.app/gift/munch-museum-1', uuidv5.URL), {
  id: uuidv5('https://api.thegift.app/gift/munch-museum-1', uuidv5.URL),
  kind: 'MuseumGift',
  museumId: uuidv5('https://api.thegift.app/museum/munch-museum', uuidv5.URL),
  senderName: 'Munch Museum',
  recipientName: 'visitor',
  parts: [
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-1-photo.7046a68f.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-1-note.d5ff803f.m4a',
      clue: 'In the opening room of the exhibition, towards the back corner',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-2-photo.a046a68e.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-2-note.ffaa804f.m4a',
      clue: 'In the first room of the exhibition, on the lefthand wall as you enter',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-3-photo.d046a68e.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/munch-31f26acd/part-3-note.6gff805f.m4a',
      clue: 'In the final room of the exhibition, on the back wall',
    },
  ],
});
