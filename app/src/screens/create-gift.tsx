import React from 'react';
import uuidv5 from 'uuid/v5';

import { Gift } from '../domain';
import { ScreenTitle } from '../components/screen-title';
import { GlobalStyles } from '../themes/global';
import { CreateGift } from '../components/creating/create-gift';

const CreateGiftScreen: React.FC = () => {

  // Create out empty gift structure
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

  return <CreateGift gift={gift}/>;

};

export {
  CreateGiftScreen,
};
