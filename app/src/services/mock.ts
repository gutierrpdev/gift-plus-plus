import uuidv5 from 'uuid/v5';
import { GetGiftResponse } from '../common/api-schema';

export const mockGifts = new Map<string, GetGiftResponse>();

/* tslint:disable max-line-length */

// 5475400c-684c-515f-8343-b9d14340de9c
mockGifts.set(uuidv5('https://api.gift.com/gift/test-1', uuidv5.URL), {
  id: uuidv5('https://api.gift.com/gift/test-1', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test-1', uuidv5.URL),
  accountId: uuidv5('https://api.gift.com/account/test-1', uuidv5.URL),
  senderName: 'The sender name',
  recipientName: 'The recipient name',
  recipientGreeting: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-recipientName.m4a',
  parts: [
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part1-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part1-clue.m4a',
      clue: 'Part 1 clue',
    },
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part2-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part2-clue.m4a',
      clue: 'Part 2 clue',
    },
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part3-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a3604a43-866f-463c-aec2-0f8dded8772f-part3-clue.m4a',
      clue: 'Part 3 clue',
    },
  ],
});


// 2e73df73-4faf-5c0a-abaa-c3717fd3ef7c
mockGifts.set(uuidv5('https://api.gift.com/gift/test-2', uuidv5.URL), {
  id: uuidv5('https://api.gift.com/gift/test-2', uuidv5.URL),
  kind: 'MuseumGift',
  museumId: uuidv5('https://api.gift.com/museum/test-1', uuidv5.URL),
  accountId: uuidv5('https://api.gift.com/account/test-1', uuidv5.URL),
  senderName: 'Darren',
  recipientName: 'Michael',
  recipientGreeting: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/9db1dc38-4424-419d-b469-3f14b134ba9b-recipientName.m4a',
  parts: [
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/9db1dc38-4424-419d-b469-3f14b134ba9b-part1-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/9db1dc38-4424-419d-b469-3f14b134ba9b-part1-clue.m4a',
      clue: 'Part 1 clue for a 2 part gift.',
    },
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/9db1dc38-4424-419d-b469-3f14b134ba9b-part2-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/9db1dc38-4424-419d-b469-3f14b134ba9b-part2-clue.m4a',
      clue: 'Part 2 clue for a 2 part gift.',
    },
  ],
});


// cdfc5287-9d03-5c70-94f1-755d4480bfac
mockGifts.set(uuidv5('https://api.gift.com/gift/test-3', uuidv5.URL), {
  id: uuidv5('https://api.gift.com/gift/test-3', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test-1', uuidv5.URL),
  accountId: uuidv5('https://api.gift.com/account/test-1', uuidv5.URL),
  senderName: 'Darren Lambert',
  recipientName: 'Nick Tandavanitj',
  recipientGreeting: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a1225484-6881-48d9-a6f7-0ae4824623d1-recipientName.m4a',
  parts: [
    {
      photo: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a1225484-6881-48d9-a6f7-0ae4824623d1-part1-photo.jpg',
      note: 'https://s3.eu-west-2.amazonaws.com/bt-gift-app/staging/app-uploads/c879827b-3c84-47cc-8ee5-37955449b0e1/a1225484-6881-48d9-a6f7-0ae4824623d1-part1-clue.m4a',
      clue: 'This is a clue for the only part of a one part gift.  Kinda long.',
    },
  ],
});


/* tslint:enable max-line-length */
