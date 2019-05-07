import React from 'react';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

import { InProgressGift } from '../domain';
import { CreateGift } from '../components/creating/create-gift';
import { track, newGiftStartedEvent } from '../utils/events';

/**
 * Create gift screen
 */

const CreateGiftScreen: React.FC = () => {

  const gift: InProgressGift = {
    id: uuidv4(),
    museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
    parts: [],
  };

  track(newGiftStartedEvent({ giftId: gift.id }));

  return <CreateGift gift={gift} />;
};

export {
  CreateGiftScreen,
};
