import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { events } from '../services';
import { hAtMuseumConfirmedEvent, termsAcceptedEvent } from '../event-definitions';

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
import { ChooseLocation, RecipientLocation } from '../components/choose-location';
import {
    getHasSeenHomeIntro,
    setHasSeenHomeIntro,
    getHasUnopenedMuseumGift,
    getSessionRecipientLocation,
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
  | 'choose-location'
  | 'got-new-gift'
  | 'create-gift'
  | 'show-gifts'
;

export const HomeScreen: React.FC = () => {

  // State
  const [status, setStatus] = useState<Status>('none');

  // Default to the stored state
  const [termsAccepted, setTermsAccepted] = useState<boolean>(getUserHasAgreedTerms());

  // Default to stored recipientLocation value
  const [recipientLocation, setRecipientLocation] = useState<RecipientLocation>(getSessionRecipientLocation);

  // Listen for change on location, and re-trigger showNextScreen when selected
  useEffect(() => {
    showNextScreen(status);
  }, [recipientLocation]);

  //  Todo: We need to pass in the gift object/details about the default gift, and remove BH wording
  const museumName = 'Brighton Museum';

  // Takes the desired status and takes the user to the correct point
  // They have have seen the desired panel, so push forward to the next one
  function showNextScreen(nextStatus: Status) {

    if (nextStatus === 'intro1') {

      // Have we already seen the intro?
      getHasSeenHomeIntro() ? showNextScreen('choose-location') : setStatus('intro1');

    } else if (nextStatus === 'intro2') {

      setStatus('intro2');

    } else if (nextStatus === 'how-about') {

      setStatus('how-about');

    } else if (nextStatus === 'choose-location') {

      setHasSeenHomeIntro(true);

      if (recipientLocation === 'unknown') {

        // Show the choose location screen
        setStatus('choose-location');

      } else {

        showNextScreen('got-new-gift');

      }

    } else if (nextStatus === 'got-new-gift') {

      if (recipientLocation === 'at-museum') {

        // Do we have a new museum gift?
        if (getHasUnopenedMuseumGift()) {

          // Go to start
          setStatus('got-new-gift');

        } else {

          // Go to the home screen
          setStatus('create-gift');

        }

      } else if (recipientLocation === 'not-at-museum') {

        // Go to the home screen
        setStatus('show-gifts');

      }

    } else {
      // Safety net
      setStatus('none');
    }

  }


  // Handle the location set
  function handleSetLocation(location: RecipientLocation): void {
    if (location === 'at-museum') events.track(hAtMuseumConfirmedEvent(true));
    if (location === 'not-at-museum') events.track(hAtMuseumConfirmedEvent(false));

    // Store in session
    setSessionRecipientLocation(location);

    // Set state
    setRecipientLocation(location);

    // Note: No need to update state/status/UI as useEffect will do this based on setRecipientLocation update

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
          <HomeIntro2 onComplete={() => {showNextScreen('choose-location'); }} />
        }

        {status === 'choose-location' &&
          <ChooseLocation
            museumName={museumName}
            onLocationSelected={handleSetLocation}
          />
        }

        {status === 'got-new-gift' &&
          <HomeNewGift museumName={museumName} />
        }

        {status === 'create-gift' &&
          <HomeCreateGift onMoreClick={() => {setStatus('show-gifts'); }} />
        }

        {status === 'show-gifts' &&
          <HomeGifts museumName={museumName} />
        }

    </ScreenManager>

  );
};
