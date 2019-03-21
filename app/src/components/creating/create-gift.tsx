import React, { useState } from 'react';

import { assertNever } from '../../utils/helpers';

import { Gift } from '../../domain';
import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { CreateGiftStart } from '../creating/create-gift-start';
import { CreatingPartContent } from '../creating/part-content';

/**
 * Gift Create screen top level component
 */

// Current status of this screen
type Status = 'start' | 'creating-part' | 'sign-gift';
/* Todo : other parts include verify and send, but these are likely reached from a verification email link
   and so might be a seperate screen, with the gift already saved */

interface Props {
  gift: Gift;
}

const CreateGift: React.FC<Props> = ({ gift }) => {

  const [status, setStatus] = useState<Status>('start');

  // Move to section
  function gotoCreatePart() {
    setStatus('creating-part');
  }

  function gotoSignGift() {
    setStatus('sign-gift');
  }

  // Background
  const bgImage = require('../../assets/svg/bg.svg');

  return (

    <ScreenManager backgroundImageUrl={bgImage}>
      <GlobalStyles />

      {status === 'start' &&
        <>
          <ScreenHeader
            subTitle={`Making a gift for ...`}
          />
          <CreateGiftStart
            gift={gift}
            onComplete={gotoCreatePart}
          />
        </>
      }

      {status === 'creating-part' &&
        <>
          <ScreenHeader
            subTitle={`Making a gift for ${gift.recipientName}`}
          />
          <CreatingPartContent
            gift={gift}
            onComplete={gotoSignGift}
          />
        </>
      }

      {/* {status === 'sign-gift' &&
      } */}

    </ScreenManager>
  );

};

export {
  CreateGift,
};
