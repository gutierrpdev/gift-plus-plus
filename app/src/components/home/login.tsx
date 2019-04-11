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

/**
 * Login top level component
 */

const Login: React.FC = () => {

  return (

    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      <ScreenHeader
        title={`Sign in`}
      />

      {/* Content */}
      <Panel>

        Sign in

      </Panel>

    </ScreenManager>
  );

};

export {
  Login,
};
