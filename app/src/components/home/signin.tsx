import React, { useState } from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { WaitThen } from '../wait-then';
import { BgSvgFullScreen } from '../svg/bg';
import { TextInput } from '../inputs/text-input';

/**
 * Login top level component
 */

const SignIn: React.FC = () => {

  return (

    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />

      <ScreenHeader
        title={`Sign in`}
        showMenuBurger={false}
        showCloseButton={true}
      />

      <Panel>
        <PanelContent>
          <TextInput
            placeHolder={'Your email address'}
            // onTextChanged={setRecipientName}
            // onEnterPressed={() => {onComplete(recipientName); }}
          />
        </PanelContent>
        <Buttons>
          {/* {recipientName &&
           <Button onClick={() => onComplete(recipientName)} primary={true}>
             Enter
           </Button>
          } */}
        </Buttons>
      </Panel>

    </ScreenManager>
  );

};

export {
  SignIn,
};
