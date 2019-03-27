import React, { useState } from 'react';

import { Gift } from '../../domain';
import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { CreateGiftStart } from '../creating/create-gift-start';
import { CreatingPartContent } from '../creating/part-content';
import { SignGift } from '../creating/sign-gift';

/**
 * Gift Create screen top level component
 */

// Current status of this screen
type Status = 'start' | 'creating-part' | 'sign-gift';
/* Todo : other parts include verify and send, but these are likely reached from a verification email link
   and so might be a seperate screen, with the gift already saved */

// Header state
type HeaderState = 'name-unknown' | 'named-big' | 'named-small';

interface Props {
  gift: Gift;
}

const CreateGift: React.FC<Props> = ({ gift }) => {

  const [status, setStatus] = useState<Status>('sign-gift');
  const [headerState, setHeaderState] = useState<HeaderState>('name-unknown');

  // Move to section
  function gotoCreatePart() {
    setStatus('creating-part');
  }

  function gotoSignGift() {
    setStatus('sign-gift');
  }

  // When the recipient name is set update our header
  function setRecipientNameSet() {
    setHeaderState('named-small');
  }

  // Background
  const bgImage = require('../../assets/svg/bg.svg');

  return (

    <ScreenManager backgroundImageUrl={bgImage}>
      <GlobalStyles />

      {/* Header */}
      {headerState === 'name-unknown' &&
        <ScreenHeader
          topPadding={true}
          title={`Making\na gift...`}
        />
      }

      {/* todo named-big unused */}
      {/* {headerState === 'named-big' &&
        <ScreenHeader
          showLogo={true}
          postSubTitle={`Making a gift for...`}
          background={'white'}
        />
      } */}

      {headerState === 'named-small' &&
        <ScreenHeader
          preSubTitle={`Making a gift for`}
          subTitle={gift.recipientName}
          background={'white'}
        />
      }

      {/* Content */}
      {status === 'start' &&
        <CreateGiftStart
          gift={gift}
          onRecipientNameSet={setRecipientNameSet}
          onComplete={gotoCreatePart}
        />
      }

      {status === 'creating-part' &&
        <CreatingPartContent
          gift={gift}
          onComplete={gotoSignGift}
        />
      }

      {/* todo: isVerified and userName */}
      {status === 'sign-gift' &&
        <SignGift
          gift={gift}
          isVerifiedUser={false}
        />
      }

    </ScreenManager>
  );

};

export {
  CreateGift,
};
