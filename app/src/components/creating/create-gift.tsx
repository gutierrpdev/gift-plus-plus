import React, { useState } from 'react';

import { InProgressGift } from '../../domain';
import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { CreateGiftIntro } from '../creating/intro';
import { CreateGiftChooseRecipient } from '../creating/choose-recipient';
import { CreateGiftRecordAndPlayback } from '../creating/record-and-playback';
import { CreatingPartContent } from '../creating/part-content';
import { SignGift } from '../creating/sign-gift';
import { BgSvgFullScreen } from '../svg/bg';

/**
 * Gift Create screen top level component
 */

// Current status of this screen
type Status =
  | 'intro'
  | 'choose-recipient'
  | 'record-greeting'
  | 'creating-part'
  | 'sign-gift'
;


interface Props {
  gift: InProgressGift;
}


export const CreateGift: React.FC<Props> = ({ gift }) => {
  const [status, setStatus] = useState<Status>('intro');

  const headerState = (status === 'intro' || status === 'choose-recipient')
                    ? 'name-unknown'
                    : 'named-small';

  return (

    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      {headerState === 'name-unknown' &&
       <ScreenHeader
         topPadding={'medium'}
         title={`Making\na gift...`}
       />
      }

      {headerState === 'named-small' &&
       <ScreenHeader
         preSubTitle={`Making a gift for`}
         subTitle={gift.recipientName}
         background={'white'}
       />
      }

      {/* Content */}
      {status === 'intro' &&
       <CreateGiftIntro
         onComplete={() => setStatus('choose-recipient')}
       />
      }

      {status === 'choose-recipient' &&
       <CreateGiftChooseRecipient
         onComplete={(recipientName) => {
           // TODO: deal with gift state properly
           gift.recipientName = recipientName;
           setStatus('record-greeting');
         }}
       />
      }

      {status === 'record-greeting' &&
       <CreateGiftRecordAndPlayback
         text={`Record a greeting for ${gift.recipientName}`}
         saveButtonText={'Save Greeting'}
         onComplete={(greeting) => {
           // TODO: deal with gift state properly
           gift.recipientGreeting = greeting;
           setStatus('creating-part');
         }}
       />
      }

      {status === 'creating-part' && gift.recipientName !== undefined &&
       <CreatingPartContent
         recipientName={gift.recipientName}
         onComplete={(parts) => {
           // TODO: deal with gift state properly
           gift.parts = parts;
           setStatus('sign-gift');
         }}
       />
      }

      {status === 'sign-gift' &&
       <SignGift />
      }

    </ScreenManager>
  );

};
