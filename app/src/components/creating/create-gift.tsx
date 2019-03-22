import React, { useState } from 'react';

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

// Header state
type HeaderState = 'start' | 'choosing-recipient' | 'recipient-choosen';

interface Props {
  gift: Gift;
}

const CreateGift: React.FC<Props> = ({ gift }) => {

  const [status, setStatus] = useState<Status>('creating-part');
  const [headerState, setHeaderState] = useState<HeaderState>('choosing-recipient');

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

      {headerState === 'start' &&
        <ScreenHeader
          topPadding={true}
          title={`Making a new gift...`}
        />
      }

      {headerState === 'choosing-recipient' &&
        <ScreenHeader
          showLogo={true}
          postSubTitle={`Making a gift for...`}
          background={'white'}
        />
      }

      {headerState === 'recipient-choosen' &&
        <ScreenHeader
          postSubTitle={`Making a gift...`}
          subTitle={gift.recipientName}
          background={'white'}
        />
      }

      {status === 'start' &&
        <CreateGiftStart
          gift={gift}
          onComplete={gotoCreatePart}
        />
      }

      {status === 'creating-part' &&
        <CreatingPartContent
          gift={gift}
          onComplete={gotoSignGift}
        />
      }

      {status === 'sign-gift' &&
        <p>Sign gift</p>
      }

    </ScreenManager>
  );

};

export {
  CreateGift,
};
