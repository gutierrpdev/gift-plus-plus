import uuidv5 from 'uuid/v5';
import { Gift } from '../src/domain';

const image =  require('../src/assets/test.png');

export const giftThreeParts: Gift = {
  id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
  accountId: uuidv5('https://api.gift.com/account/test', uuidv5.URL),
  senderName: 'The Sender',
  recipientName: 'The Receiver',
  recipientGreeting: 'https://todo.com/todo',
  parts: [
    {
      photo: image,
      note: 'https://todo.com/todo',
      clue: 'Part 1 clue',
    },
    {
      photo: image,
      note: 'https://todo.com/todo',
      clue: 'Part 2 clue',
    },
    {
      photo: image,
      note: 'https://todo.com/todo',
      clue: 'Part 3 clue',
    },
  ],
};

export const giftTwoParts: Gift = {
  id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
  accountId: uuidv5('https://api.gift.com/account/test', uuidv5.URL),
  senderName: 'The Sender',
  recipientName: 'The Receiver',
  recipientGreeting: 'https://todo.com/todo',
  parts: [
    {
      photo: 'https://picsum.photos/300/300/?random',
      note: 'https://todo.com/todo',
      clue: 'Part 1 clue',
    },
    {
      photo: 'https://picsum.photos/300/300/?random',
      note: 'https://todo.com/todo',
      clue: 'Part 2 clue',
    },
  ],
};
