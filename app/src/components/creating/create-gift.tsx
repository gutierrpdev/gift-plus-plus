import React, { useState, useEffect } from 'react';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

import { InProgressGift, Gift } from '../../domain';
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
  | 'creating-part'
  | 'sign-gift'
  | 'save-gift'
  | 'share-gift'
  | 'outro'
;


interface Props {
  museumName: string;
}


export const CreateGift: React.FC<Props> = ({ museumName }) => {

  const [status, setStatus] = useState<Status>('intro');
  const [newGift, setNewGift] = useState<Gift | null>(null); // TODO: TEMP: refactor

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
        confirmationMessage='Leaving this page will abandon your gift.  Are you sure?'
      />

      {/* Header */}
      {headerState === 'name-unknown' &&
       <ScreenHeader
         padding={'medium'}
         title={`Making a gift...`}
         museumName={museumName}
       />
      }

      {headerState === 'named-small' &&
       <ScreenHeader
         preSubTitle={`Making a gift for`}
         subTitle={gift.recipientName}
         background={'white'}
         museumName={museumName}
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
           setGift({...gift, recipientName });
           setStatus('creating-part');
           track(giftRecipientEnteredEvent({ giftId: gift.id }));
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
         onComplete={(newlyCreatedGift) => {
           setNewGift(newlyCreatedGift);
           setStatus('share-gift');
         }}
       />
      }

      {status === 'share-gift' && newGift &&
       <ShareGift
         senderName={newGift.senderName}
         recipientName={newGift.recipientName}
         museumName={museumName}
         url={mkShareLink(newGift)}
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


// TODO!!!
function mkShareLink(gift: Gift) {
  return `${window.location.protocol}//${window.location.host}/gift/${gift.id}`;
}
