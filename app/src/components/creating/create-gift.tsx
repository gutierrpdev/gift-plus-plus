import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

import { InProgressGift } from '../../domain';
import { track, newGiftStartedEvent, giftRecipientEnteredEvent } from '../../utils/events';

import { PageChangeDetect } from '../messages/page-change-detect';
import { GlobalStyles } from '../../themes/global';
import { BgSvgFullScreen } from '../svg/bg';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';

import { CreateGiftIntro } from '../creating/intro';
import { CreateGiftChooseRecipient } from '../creating/choose-recipient';
import { CreateGiftRecordAndPlayback } from '../creating/record-and-playback';
import { CreatingPartContent } from '../creating/part-content';
import { SignGift } from '../creating/sign-gift';
import { SaveGift } from '../creating/save-gift';
import { ShareGift } from '../creating/share-gift';
import { CreatingOutro } from '../creating/outro';


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
  | 'save-gift'
  | 'share-gift'
  | 'outro'
;


interface Props {}


export const CreateGift: React.FC<Props> = () => {

  const [status, setStatus] = useState<Status>('intro');

  const [gift, setGift] = useState<InProgressGift>({
    id: uuidv4(),
    museumId: uuidv5('https://api.gift.com/museum/brighton-and-hove', uuidv5.URL),
    parts: [],
  });

  useEffect(() => {
    track(newGiftStartedEvent({ giftId: gift.id }));
  }, []);

  const headerState = (status === 'intro' || status === 'choose-recipient')
                    ? 'name-unknown'
                    : 'named-small';


  // Shall we allow navigation away based on the current state
  function canNavigateAway() {
    return status === 'outro';
  }


  return (

    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />
      <PageChangeDetect
        enabled={!canNavigateAway()}
        confirmationMessage='Are you sure you want to cancel making your Gift?'
      />

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
         gift={gift}
         onComplete={(recipientName) => {
           setGift({...gift, recipientName });
           setStatus('record-greeting');
           track(giftRecipientEnteredEvent({ giftId: gift.id }));
         }}
       />
      }

      {status === 'record-greeting' &&
       <CreateGiftRecordAndPlayback
         gift={gift}
         text={`Record a greeting for ${gift.recipientName}`}
         saveButtonText={'Save Greeting'}
         eventReference={'create-gift-record-greeting'}
         onComplete={(recipientGreeting) => {
           setGift({...gift, recipientGreeting });
           setStatus('creating-part');
         }}
       />
      }

      {status === 'creating-part' && gift.recipientName !== undefined &&
       <CreatingPartContent
         gift={gift}
         recipientName={gift.recipientName}
         onComplete={(parts) => {
           setGift({...gift, parts });
           setStatus('sign-gift');
         }}
       />
      }

      {status === 'sign-gift' &&
       <SignGift
         onComplete={(senderName) => {
           setGift({...gift, senderName });
           setStatus('save-gift');
         }}
       />
      }

      {status === 'save-gift' &&
       <SaveGift
         gift={gift}
         onComplete={() => setStatus('share-gift')}
       />
      }

      {status === 'share-gift' &&
       <ShareGift
         recipientName={gift.recipientName || ''}
         url={'https://todo.giftapp.com'}
         onComplete={() => setStatus('outro')}
       />
      }

      {status === 'outro' &&
       <CreatingOutro
         gift={gift}
       />
      }

    </ScreenManager>
  );

};
