import React from 'react';
import uuidv5 from 'uuid/v5';

import { Gift } from '../domain';
import { CreateGift } from '../components/creating/create-gift';

/**
 * Create gift screen
 */

const CreateGiftScreen: React.FC = () => {

  // Create our empty gift structure
  // todo
  const gift: Gift = {
    id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
    kind: 'PersonalGift',
    museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
    accountId: uuidv5('https://api.gift.com/account/test', uuidv5.URL),
    senderName: '',
    recipientName: '',
    recipientGreeting: '',
    parts: [],
  };

  return <CreateGift gift={gift} />;
};

export {
  CreateGiftScreen,
};
