import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import history from '../../utils/router-history';

import styled from 'styled-components';
import uuidv4 from 'uuid/v4';
import uuidv5 from 'uuid/v5';

import { InProgressGift, Gift } from '../../domain';

import { events } from '../../services';
import {
  cNewGiftStartedEvent,
  cIntroCompletedEvent,
  cRecipientNameEnteredEvent,
  cSigningCompletedEvent,
  cSharingCompletedEvent,
  cSharingChannelChosenEvent,
} from '../../event-definitions';

import { PageChangeDetect } from '../messages/page-change-detect';
import { GlobalStyles, global } from '../../themes/global';
import { BgSvgFullScreen } from '../svg/bg';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { TextResize } from '../text-resize';

import { CreateGiftIntro } from '../creating/intro';
import { CreateGiftChooseRecipient } from '../creating/choose-recipient';
import { CreatingPartContent } from '../creating/part-content';
import { SignGift } from '../creating/sign-gift';
import { SaveGift } from '../creating/save-gift';
import { ShareGift } from '../creating/share-gift';
import { CreatingOutro } from '../creating/outro';


/**
 * Gift Create screen top level component
 */

export const MainTitle = styled(TextResize).attrs({
  textSize: 155,
})`
  z-index: 1;
  width: 90%;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  line-height: 0.9;
  margin: 2vh 0 0;
`;

// Current status of this screen
type Status =
  | 'sign-gift'
  | 'save-gift'
  | 'share-gift'
  | 'outro'
;

interface Props {
  museumName: string;
}

export const CreateGift: React.FC<Props> = ({ museumName }) => {

  const [status, setStatus] = useState<Status>('sign-gift');
  const [newGift, setNewGift] = useState<Gift | null>(null); // TODO: TEMP: refactor

  const [gift, setGift] = useState<InProgressGift>({
    id: uuidv4(),
    museumId: uuidv5('https://api.thegift.app/museum/brighton-museum', uuidv5.URL),
    parts: [],
  });

  useEffect(() => {
    events.track(cNewGiftStartedEvent(gift.id));
  }, []);

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

      <Switch>

        {/* intro */}
        <Route exact={true} path='/create-gift'>

          <HeaderCreating museumName={museumName} />

          <CreateGiftIntro
            onComplete={() => {
              events.track(cIntroCompletedEvent(gift.id));
              history.push('/create-gift/choose');
            }}
          />
        </Route>

        {/* choose */}
        <Route exact={true} path='/create-gift/choose'>

          <HeaderCreating museumName={museumName} />

          <CreateGiftChooseRecipient
            giftId={gift.id}
            onComplete={(recipientName) => {
              events.track(cRecipientNameEnteredEvent(gift.id));
              setGift({...gift, recipientName });
              history.push('/create-gift/part/first-message');
            }}
          />

        </Route>

        {/* content part */}
        <Route exact={false} path='/create-gift/part'>

          <HeaderCreatingGiftFor museumName={museumName} recipientName={gift.recipientName || ''} />

          <CreatingPartContent
            gift={gift}
            recipientName={gift.recipientName || ''}
            onComplete={(parts) => {
              setGift({...gift, parts });
              history.push('/create-gift/sign');
            }}
          />

        </Route>

        {/* sign and finish */}
        <Route exact={false} path='/create-gift/sign'>

          <HeaderCreatingGiftFor museumName={museumName} recipientName={gift.recipientName || ''} />

          {status === 'sign-gift' &&
          <SignGift
            onComplete={(senderName) => {
              events.track(cSigningCompletedEvent(gift.id));
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
            onChannelClicked={(channel) => {
              events.track(cSharingChannelChosenEvent(gift.id, channel));
            }}
            onComplete={() => {
              events.track(cSharingCompletedEvent(gift.id));
              setStatus('outro');
            }}
          />
          }

          {status === 'outro' &&
          <CreatingOutro
            gift={gift}
          />
          }

        </Route>

      </Switch>

    </ScreenManager>
  );

};

const HeaderCreating: React.FC<Props> = ({ museumName }) => (
  <>
    <ScreenHeader
      museumName={museumName}
    />
    <MainTitle>Creating<br/>
      a gift...</MainTitle>
  </>
);

interface HeaderCreatingGiftForProps {
  recipientName: string;
  museumName: string;
}
const HeaderCreatingGiftFor: React.FC<HeaderCreatingGiftForProps> = ({ recipientName, museumName }) => (
  <ScreenHeader
    preSubTitle={`Creating a gift for`}
    subTitle={recipientName}
    background={'white'}
    museumName={museumName}
    showGradient={'small'}
  />
);

// TODO!!!
function mkShareLink(gift: Gift) {
  return `${window.location.protocol}//${window.location.host}/gift/${gift.id}`;
}
