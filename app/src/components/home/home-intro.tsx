import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { WaitThen } from '../wait-then';
import { BgSvgFullScreen } from '../svg/bg';

/**
 * Home screen top level component
 */

// Current status of this screen
type Status = 'start' | 'sign-in' | 'choose-location';
/* Todo : other parts include verify and send, but these are likely reached from a verification email link
   and so might be a seperate screen, with the gift already saved */

const HomeIntro: React.FC = () => {

  // State
  const [status, setStatus] = useState<Status>('start');

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
            <Buttons>
              <Button><Link to='/sign-in'>Sign-in</Link></Button>
              <Button primary={true}>Find out more</Button>{/* todo */}
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
