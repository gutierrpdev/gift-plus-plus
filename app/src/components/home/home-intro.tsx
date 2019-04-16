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
import { Buttons, Button } from '../buttons';
import { WaitThen } from '../wait-then';
import { BgSvgFullScreen } from '../svg/bg';
import SvgGift from '../svg/gift';

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
type Status = 'start' | 'sign-in' | 'got-new-gift';
/* Todo : other parts include verify and send, but these are likely reached from a verification email link
   and so might be a seperate screen, with the gift already saved */

//  Todo: We need to pass in the gift object/details about the default gift, and remove BH wording

const HomeIntro: React.FC = () => {

  // State
  const [status, setStatus] = useState<Status>('got-new-gift');

  // Defaults
  const defaultWait = 5;

  return (

    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      <ScreenHeader
        topPadding={'medium'}
        title={`Gift`}
        postTitle={'at Brighton Museum & Art Gallery'}
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
              />
            </PanelContent>
            <Buttons />
            <WaitThen
              wait={defaultWait}
              andThen={() => { setStatus('sign-in'); }}
            />
          </>
        }

        {status === 'sign-in' &&
          <>
            <PanelContent>
              <PanelPrompt
                text='How about
                  from objects
                  in a museum?'
                textColor='black'
                textSize={70}
                background='solid-white'
              />
            </PanelContent>
            <Buttons />
            <WaitThen
              wait={defaultWait}
              andThen={() => { setStatus('got-new-gift'); }}
            />
          </>
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
