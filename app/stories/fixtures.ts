import uuidv5 from 'uuid/v5';
import { Gift, GiftPart } from '../src/domain';

export const giftThreeParts: Gift = {
  id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
  kind: 'PersonalGift',
  museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
  accountId: uuidv5('https://api.gift.com/account/test', uuidv5.URL),
  senderName: 'The Sender',
  recipientName: 'The Receiver',
  recipientGreeting: require('../src/assets/audio/_1-second-of-silence.mp3'),
  parts: [
    {
      photo: require('../src/assets/test.jpg'),
      note: require('../src/assets/audio/_1-second-of-silence.mp3'),
      clue: 'Part 1 clue',
    },
    {
      photo: require('../src/assets/test.jpg'),
      note: require('../src/assets/audio/_1-second-of-silence.mp3'),
      clue: 'Part 2 clue',
    },
    {
      photo: require('../src/assets/test.jpg'),
      note: require('../src/assets/audio/_1-second-of-silence.mp3'),
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
  recipientGreeting: require('../src/assets/audio/_1-second-of-silence.mp3'),
  parts: [
    {
      photo: 'https://picsum.photos/300/300/?random',
      note: require('../src/assets/audio/_1-second-of-silence.mp3'),
      clue: 'Part 1 clue',
    },
    {
      photo: 'https://picsum.photos/300/300/?random',
      note: require('../src/assets/audio/_1-second-of-silence.mp3'),
      clue: 'Part 2 clue',
    },
  ],
};

export const giftPart: GiftPart = {
  photo: require('../src/assets/test.jpg'),
  note: require('../src/assets/audio/_1-second-of-silence.mp3'),
  clue: 'Part 1 clue',
};

