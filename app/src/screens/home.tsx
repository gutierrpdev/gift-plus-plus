import React, { useState } from 'react';
import styled from 'styled-components';

import { events } from '../services';
import { termsAcceptedEvent } from '../event-definitions';

import { GlobalStyles, global } from '../themes/global';
import { ScreenManager } from '../components/screen-manager';
import { TextResize } from '../components/text-resize';
import { ScreenHeader } from '../components/screen-header';
import { HomeIntro1 } from '../components/home/home-intro-1';
import { HomeIntro2 } from '../components/home/home-intro-2';
import { HomeNewGift } from '../components/home/home-new-gift';
import { HomeCreateGift } from '../components/home/home-create-gift';
import { HomeGifts } from '../components/home/home-gifts';

import { BgSvgFullScreen } from '../components/svg/bg';
import {
    getHasSeenHomeIntro,
    setHasSeenHomeIntro,
    getHasUnopenedMuseumGift,
    setSessionRecipientLocation,
    getUserHasAgreedTerms,
} from '../utils/local';

/**
 * Component that manages the home intro sequence
 * All screen state logic is in here, with the layout in the components
 */

export const MainTitle = styled(TextResize).attrs({
  textSize: 320,
})`
  z-index: 1;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.black};
  margin: 7vh 0 0;
`;

export const MuseumName = styled(TextResize).attrs({
  textSize: 40,
})`
  z-index: 1;
  width: 90%;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  line-height: 0.9;
`;

export const MainTitleSmall = styled(TextResize).attrs({
  textSize: 160,
})`
  z-index: 1;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.black};
  margin: 2vh 0 0.5vh;
`;

export const MuseumNameSmall = styled(TextResize).attrs({
  textSize: 35,
})`
  z-index: 1;
  width: 90%;
  text-align: center;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  line-height: 0.9;
  margin: 0 0 1vh 0;
`;

// Current status of this screen
type Status =
  | 'none'
  | 'intro1'
  | 'intro2'
  | 'how-about'
  | 'got-new-gift'
  | 'create-gift'
  | 'show-gifts'
;

export const HomeScreen: React.FC = () => {

  // State
  const [status, setStatus] = useState<Status>('none');

  // Default to the stored state
  const [termsAccepted, setTermsAccepted] = useState<boolean>(getUserHasAgreedTerms());

  //  Todo: We need to pass in the gift object/details about the default gift, and remove BH wording
  const museumName = 'Brighton Museum';

  // Takes the desired status and takes the user to the correct point
  // They have have seen the desired panel, so push forward to the next one
  function showNextScreen(nextStatus: Status) {

    if (nextStatus === 'intro1') {

      // Have we already seen the intro?
      getHasSeenHomeIntro() ? showNextScreen('got-new-gift') : setStatus('intro1');

    } else if (nextStatus === 'intro2') {

      setStatus('intro2');

    } else if (nextStatus === 'how-about') {

      setStatus('how-about');

    } else if (nextStatus === 'got-new-gift') {

      setHasSeenHomeIntro(true);

      // Do we have a new museum gift?
      if (getHasUnopenedMuseumGift()) {

        // Go to start
        setStatus('got-new-gift');

      } else {

        // Go to the home screen
        setStatus('create-gift');

      }

    } else {
      // Safety net
      setStatus('none');
    }

  }


  // Start, default to first screen
  if (status === 'none') {
    showNextScreen('intro1');
  }

  // Determine header style
  const homeHeader = status === 'show-gifts';
  const allowScroll = status === 'show-gifts';

  function handleTermsAccepted() {
    events.track(termsAcceptedEvent());
    setTermsAccepted(true);
  }

  // Set that the visitor is at the museum
  setSessionRecipientLocation('at-museum');

  return (
    <ScreenManager allowScroll={allowScroll}>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      <ScreenHeader
        padding='none'
        onTermsAccepted={handleTermsAccepted}
        museumName={museumName}
      />

      {/* Title */}
      {homeHeader &&
        <>
          <MainTitleSmall>Gift</MainTitleSmall>
          <MuseumNameSmall>{`at ${museumName}`}</MuseumNameSmall>
        </>
      }
      {!homeHeader &&
        <>
          <MainTitle>Gift</MainTitle>
          <MuseumName>{`at ${museumName}`}</MuseumName>
        </>
      }


      {/* Content */}
      {status === 'intro1' && !termsAccepted && <HomeIntro1 />}
      {status === 'intro1' && termsAccepted && <HomeIntro1 onComplete={() => {setStatus('intro2'); }} />}

      {status === 'intro2' &&
        <HomeIntro2 onComplete={() => {showNextScreen('got-new-gift'); }} />
      }

      {status === 'got-new-gift' &&
        <HomeNewGift museumName={museumName} curatedGiftId={''} />
      }

      {status === 'create-gift' &&
        <HomeCreateGift onMoreClick={() => {setStatus('show-gifts'); }} />
      }

      {status === 'show-gifts' &&
       <HomeGifts museumName={museumName} curatedGiftId={''} />
      }

    </ScreenManager>
  );
};
