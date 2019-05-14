import React from 'react';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

import { InProgressGift } from '../domain';
import { CreateGift } from '../components/creating/create-gift';
import { track, newGiftStartedEvent } from '../utils/events';
import { isIosDeviceUsingChrome } from '../utils/helpers';
import { UnsupportedDevice } from '../components/messages/unsupported-device';

/**
 * Create gift screen
 */

const CreateGiftScreen: React.FC = () => {

  // Check the device meets our requirements

  // If this is an iOS device using Chrome prompt the user to use Safari, as they will have it
  if (isIosDeviceUsingChrome()) {

    return (
      <UnsupportedDevice message='Please open Gift in Safari on this device' />
    );

  }

  // Everything seems set so setup new gift

  // Create out new gift
  const gift: InProgressGift = {
    id: uuidv4(),
    museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
    parts: [],
  };

  // Track new gift
  track(newGiftStartedEvent({ giftId: gift.id }));

  // Show
  return <CreateGift gift={gift} />;
};

export {
  CreateGiftScreen,
};
