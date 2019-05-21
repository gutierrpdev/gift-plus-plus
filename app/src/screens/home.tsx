import React, { useState, useEffect } from 'react';

import { GlobalStyles } from '../themes/global';
import { ScreenManager } from '../components/screen-manager';
import { ScreenHeader } from '../components/screen-header';
import { HomeIntro1 } from '../components/home/home-intro-1';
import { HomeIntro2 } from '../components/home/home-intro-2';
import { HomeNewGift } from '../components/home/home-new-gift';
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
import {
  track,
  homeLocationSelectedEvent,
} from '../utils/events';

/**
 * Component that manages the home intro sequence
 * All screen state logic is in here, with the layout in the components
 */

// Current status of this screen
type Status = 'none' | 'intro1' | 'intro2' | 'how-about' | 'choose-location' | 'got-new-gift' | 'show-gifts';

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

        // todo: check if we have a new gift.  If not go to /

        // Do we have a new museum gift?
        if (hasUnopenedMuseumGift()) {

          // Go to start
          setStatus('got-new-gift');

        } else {

          // Go to the home screen
          setStatus('show-gifts');

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

    // Record event
    track(homeLocationSelectedEvent( { location: recipientLocation } ));

    // Store in session
    setSessionRecipientLocation(location);

    // Set state
    setRecipientLocation(location);

    // Note: No need to update state/status/UI as useEffect will do this based on setRecipientLocation update

  }

  // Check if the user has unopneded gift from the museum
  function hasUnopenedMuseumGift(): boolean {
    // Todo: this might be an API look up
    return getHasUnopenedMuseumGift();
  }

  // Start, default to first screen
  if (status === 'none') {
    showNextScreen('intro1');
  }

  // Determine header style
  const homeHeader = status === 'show-gifts';

  function handleTermsAccepted() {
    setTermsAccepted(true);
  }

  return (
    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      {homeHeader &&
        <ScreenHeader
          background='transparent-white'
          topPadding={'small'}
          title={`Gift`}
          postTitle={`at ${museumName}`}
          titleSize={'big'}
          message='Think of someone special
            and create a playlist for them
            from objects around the
            museum'
          museumName={museumName}
          onTermsAccepted={handleTermsAccepted}
        />
      }
      {!homeHeader &&
        <ScreenHeader
          topPadding={'medium'}
          title={`Gift`}
          postTitle={`at ${museumName}`}
          titleSize={'very-big'}
          museumName={museumName}
          onTermsAccepted={handleTermsAccepted}
        />
      }

      {/* Content */}
        {status === 'intro1' && !termsAccepted && <HomeIntro1/>}
        {status === 'intro1' && termsAccepted && <HomeIntro1 onComplete={() => {setStatus('intro2'); }} />}

        {status === 'intro2' &&
          <HomeIntro2 onComplete={() => {showNextScreen('choose-location'); }} />
        }

        {status === 'choose-location' &&
          <ChooseLocation
            museumName={museumName}
            doSetLocation={handleSetLocation}
          />
        }

        {status === 'got-new-gift' &&
          <HomeNewGift museumName={museumName} />
        }

        {status === 'show-gifts' &&
          <HomeGifts museumName={museumName} />
        }

    </ScreenManager>

  );
};
