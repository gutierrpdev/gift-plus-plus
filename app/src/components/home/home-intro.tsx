import React, { useState } from 'react';
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
import { WaitThen } from '../wait-then';
import { BgSvgFullScreen } from '../svg/bg';
import SvgGift from '../svg/gift';
import { ChooseLocation, RecipientLocation } from '../choose-location';
import {
    getHasSeenHomeIntro,
    setHasSeenHomeIntro,
    getHasSeenHomeHowAbout,
    setHasSeenHomeHowAbout,
    getSessionRecipientLocation,
    setSessionRecipientLocation,
} from '../../utils/local';
import history from '../../utils/router-history';

/**
 * Home screen top level component
 */

const GiftImg = styled.div`
  margin-bottom: 1vh;
  width: 40%;
  position: relative;
  &:after {
    content: '';
    background-color: ${global.colour.darkRed};
    width: 3vh;
    height: 3vh;
    position: absolute;
    border-radius: 50%;
    top: 0;
    right: -2vw;
  }
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

  // Defaults
  const defaultWait = 5;
  const museumName = 'Brighton Museum & Art Gallery'; // todo: get from entry URL

  // Checks our current status and shows the correct next state
  function showNextScreen(nextStatus: Status) {

    // console.log({nextStatus});

    if (nextStatus === 'start') {

      // Have we already seen the intro?
      getHasSeenHomeIntro() ? showNextScreen('how-about') : setStatus('start');

    } else if (nextStatus === 'how-about') {

      setHasSeenHomeIntro(true);

      // Have we already seen this part?
      getHasSeenHomeHowAbout() ? showNextScreen('choose-location') : setStatus('how-about');

    } else if (nextStatus === 'choose-location') {

      setHasSeenHomeHowAbout(true);

      // console.log({recipientLocation});

      if (recipientLocation === 'unknown') {

        // Show the choose location screen
        setStatus('choose-location');

      } else {

        showNextScreen('got-new-gift');

      }

    } else if (nextStatus === 'got-new-gift') {

      // console.log({recipientLocation});

      if (recipientLocation === 'at-museum') {

        // todo: check if we have a new gift.  If not go to /home

        // Go to start
        setStatus('got-new-gift');

      } else if (recipientLocation === 'not-at-museum') {

        // console.log('home');

        // Go to the home screen
        history.push('/home');

      }

    } else {
      // console.log('none');
      // Safety net
      setStatus('none');
    }

  }

  // Handle the location set
  function handleSetLocation(location: RecipientLocation): void {

    // console.log({location});

    // Set state
    setRecipientLocation(location);

    // Set session
    setSessionRecipientLocation(location);

    // Updated UI to the next screen
    // Set choose-location as this handle location checking
    setTimeout(() => {
      showNextScreen('got-new-gift');
      // console.log({status});
    }, 2000);

  }

  // Start
  // console.log({status});
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
      />

      {/* Content */}
      <Panel>

        {status === 'start' &&
          <>
            <PanelContent>
              <PanelPrompt
                text='Ever made
                  a mixtape?'
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
                <PanelText textSize={60}>You’ve got a new gift from Brighton Museum</PanelText>
              </PanelPrompt>

            </PanelContent>
            <Buttons>
              <Button><Link to='/create-gift'>Create a Gift</Link></Button>
              <Button primary={true}>
                <Link to='/gift/5475400c-684c-515f-8343-b9d14340de9c'>Show museum's Gift</Link>{/* todo */}
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
