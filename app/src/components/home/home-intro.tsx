import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelText } from '../panel-text';
import { Buttons, Button  } from '../buttons';
import { WaitThen } from '../utils/wait-then';
import { BgSvgFullScreen } from '../svg/bg';
import SvgGift from '../svg/gift';
import { ChooseLocation, RecipientLocation } from '../choose-location';
import {
    getHasSeenHomeIntro,
    setHasSeenHomeIntro,
    getHasUnopenedMuseumGift,
    setHasUnopenedMuseumGift,
    getSessionRecipientLocation,
    setSessionRecipientLocation,
} from '../../utils/local';
import {
  track,
  homeLocationSelectedEvent,
} from '../../utils/events';
import history from '../../utils/router-history';

/**
 * Home screen top level component
 */

const GiftImg = styled.div`
  margin-bottom: 1vh;
  width: 40%;
  position: relative;
`;

// Current status of this screen
type Status = 'none' | 'start' | 'how-about' | 'choose-location' | 'got-new-gift';
/* Todo : other parts include verify and send, but these are likely reached from a verification email link
   and so might be a seperate screen, with the gift already saved */

//  Todo: We need to pass in the gift object/details about the default gift, and remove BH wording

const HomeIntro: React.FC = () => {

  // State
  const [status, setStatus] = useState<Status>('none');
  // Default to stored recipientLocation value
  const [recipientLocation, setRecipientLocation] = useState<RecipientLocation>(getSessionRecipientLocation);

  // Listen for change on location, and re-trigger showNextScreen when selected
  useEffect(() => {
    showNextScreen(status);
  }, [recipientLocation]);

  // Defaults
  const defaultWait = 5;
  const museumName = 'Brighton Museum'; // todo: get from entry URL

  // Checks our current status and shows the correct next state
  function showNextScreen(nextStatus: Status) {

    if (nextStatus === 'start') {

      // Have we already seen the intro?
      getHasSeenHomeIntro() ? showNextScreen('choose-location') : setStatus('start');

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

        // todo: check if we have a new gift.  If not go to /home

        // Do we have a new museum gift?
        if (hasUnopenedMuseumGift()) {

          // Go to start
          setStatus('got-new-gift');

        } else {

          // Go to the home screen
          history.push('/home');

        }

      } else if (recipientLocation === 'not-at-museum') {

        // Go to the home screen
        history.push('/home');

      }

    } else {
      // Safety net
      setStatus('none');
    }

  }

  // Handle the location set
  function handleSetLocation(location: RecipientLocation): void {

    // Record event
    track(homeLocationSelectedEvent( {location: recipientLocation} ));

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

  function handleOpenGift() {
    // Set the museum gift as read
    setHasUnopenedMuseumGift(false);
  }

  // Start, default to first screen
  if (status === 'none') {
    showNextScreen('start');
  }

  return (

    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      <ScreenHeader
        topPadding={'medium'}
        title={`Gift`}
        postTitle={`at ${museumName}`}
        titleSize={'very-big'}
        museumName={museumName}
      />

      {/* Content */}
      <Panel>

        {status === 'start' &&
          <>
            <PanelContent>
              <PanelPrompt
                text='Ever made
                  a playlist?'
                textColor='black'
                textSize={80}
                background='solid-white'
                onClick={() => {showNextScreen('how-about'); }}
              />
            </PanelContent>
            <Buttons />
            <WaitThen
              wait={defaultWait}
              andThen={() => { setStatus('how-about'); }}
            />
          </>
        }

        {status === 'how-about' &&
          <>
            <PanelContent>
              <PanelPrompt
                text='How about
                  from objects
                  in a museum?'
                textColor='black'
                textSize={70}
                background='solid-white'
                onClick={() => {showNextScreen('choose-location'); }}
              />
            </PanelContent>
            <Buttons />
            <WaitThen
              wait={defaultWait}
              andThen={() => {showNextScreen('choose-location'); }}
            />
          </>
        }

        {status === 'choose-location' &&
          <ChooseLocation
            museumName={museumName}
            doSetLocation={handleSetLocation}
          />
        }

        {status === 'got-new-gift' &&
          <>
            <PanelContent>
              <PanelPrompt
                textColor='black'
                textSize={70}
                background='solid-white'
              >
                <GiftImg>
                  <SvgGift colour='black' />
                </GiftImg>
                <PanelText textSize={60}>You’ve got a gift from {museumName}</PanelText>
              </PanelPrompt>
            </PanelContent>
            <Buttons>
              <Button><Link to='/create-gift'>Create own gift</Link></Button>
              <Button primary={true}>
                <Link
                  onClick={handleOpenGift}
                  to='/gift/2e73df73-4faf-5c0a-abaa-c3717fd3ef7c'
                >
                  Show gift
                </Link>{/* todo: real url */}
              </Button>
            </Buttons>
          </>
        }

      </Panel>

    </ScreenManager>
  );

};

export {
  HomeIntro,
};
