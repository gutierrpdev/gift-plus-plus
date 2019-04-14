import React, { useState } from 'react';

import { Gift } from '../../domain';
import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { CreateGiftIntro } from '../creating/intro';
import { CreateGiftChooseRecipient } from '../creating/choose-recipient';
import { CreateGiftRecordGreeting } from '../creating/record-greeting';
import { CreatingPartContent } from '../creating/part-content';
import { SignGift } from '../creating/sign-gift';
import { BgSvgFullScreen } from '../svg/bg';
import { Gradient } from '../gradient';

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
  gift: Gift;
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
         topPadding={'small'}
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
         onComplete={() => setStatus('record-greeting')}
       />
      }

      {status === 'record-greeting' &&
       <CreateGiftRecordGreeting
         recipientName={gift.recipientName}
         onComplete={() => setStatus('creating-part')}
       />
      }

      {status === 'creating-part' &&
       <CreatingPartContent
         gift={gift}
         onComplete={() => setStatus('sign-gift')}
       />
      }

      {status === 'sign-gift' &&
       <SignGift />
      }

    </ScreenManager>
  );

};
