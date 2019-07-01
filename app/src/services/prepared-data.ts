import uuidv5 from 'uuid/v5';
import { GetGiftResponse, GetMuseumResponse } from '../common/api-schema';

export const preparedMuseums = new Map<string, GetMuseumResponse>();
export const preparedGifts = new Map<string, GetGiftResponse>();

/* tslint:disable max-line-length */


// =======
// MUSEUMS
// =======

/**
 * Brighton Museum
 *
 * ID: 95d5128f-e6b3-5b07-8c98-6c9876a27481
 */
preparedMuseums.set(uuidv5('https://api.thegift.app/museum/brighton-museum', uuidv5.URL), {
  id: uuidv5('https://api.thegift.app/museum/brighton-museum', uuidv5.URL),
  name: 'Brighton Museum',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/brighton-museum-1', uuidv5.URL),
});


/**
 * Munch Museum
 *
 * ID: dc640fed-634c-5a18-9580-a0a615403f62
 */
preparedMuseums.set(uuidv5('https://api.thegift.app/museum/munch-museum', uuidv5.URL), {
  id: uuidv5('https://api.thegift.app/museum/munch-museum', uuidv5.URL),
  name: 'Munch Museum',
  curatedGiftId: uuidv5('https://api.thegift.app/gift/munch-museum-1', uuidv5.URL),
});


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
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-1-photo.6046a68f.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-1-note.c4ff803e.m4a',
      clue: 'TODO',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-photo.863ba708.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-2-note.cd932aee.m4a',
      clue: 'TODO',
    },
    {
      photo: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-photo.819aeecd.jpg',
      note: 'https://bt-gift.s3.eu-west-2.amazonaws.com/static-content/curated/brighton-032bd8ddd/part-3-note.2ea33504.m4a',
      clue: 'TODO',
    },
  ],
});
