import React, { useState } from 'react';

import { assertNever } from '../../utils/helpers';

import { Gift } from '../../domain';
import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { CreateGiftStart } from '../creating/create-gift-start';

/**
 * Gift Create screen top level component
 */

// Current status of this screen
type Status = 'start' | 'select-part' | 'creating-part' | 'sign-gift';
/* Todo : other parts include verify and send, but these are likely reached from a verification email link
   and so might be a seperate screen, with the gift already saved */

interface Props {
  gift: Gift;
  museumName: string;
}

const CreateGift: React.FC<Props> = ({ gift, museumName }) => {

  const [status, setStatus] = useState<Status>('start');
  const [compactHeader, setCompactHeader] = useState(false);

  // Move to section
  // todo do we need this, check with Nick
  function gotoSelectPart() {
    setStatus('select-part');
  }

  function gotoCreatePart() {
    setStatus('creating-part');
  }

  function gotoSignGift() {
    setStatus('sign-gift');
  }

  // Return the correct content based on status
  function renderContent() {
    switch (status) {
      case 'start':
        return renderStart();
      case 'select-part':
        return renderSelectPart();
      case 'creating-part':
        return renderCreatingPart();
      case 'sign-gift':
        return renderSignGift();
      default:
        return assertNever(status);
    }
  }

  // Start section
  function renderStart() {
    return (
      <CreateGiftStart gift={gift}/>
    );
  }

  function renderSelectPart() {
    return (
      null
    );
  }

  function renderCreatingPart() {
    return (
      null
    );
  }

  function renderSignGift() {
    return (
      null
    );
  }

  // The header size is based on our current state
  const headerSize = compactHeader
                   ? 'compact'
                   : status === 'start' ? 'big' : 'small';

  // Background
  const bgImage = require('../../assets/svg/bg.svg');

  return (

    <ScreenManager backgroundImageUrl={bgImage}>
      <GlobalStyles />

      {headerSize === 'big' && // todo, no design yet
        <ScreenHeader
          subTitle={`Making a gift for`}
          postSubTitle={`from`}
          title={gift.senderName}
          postTitle={`at ${museumName}`}
          showLogo={false}
          topPadding={true}
        />
      }
      {headerSize === 'small' &&
        <ScreenHeader
          postSubTitle={`Making a gift for`}
          title={gift.senderName}
          showLogo={true}
        />
      }
      {headerSize === 'compact' &&
        <ScreenHeader
          postSubTitle={`Making a gift for`}
          title={gift.senderName}
          showLogo={false}
        />
      }

      {renderContent()}
    </ScreenManager>
  );

};

export {
  CreateGift,
};
