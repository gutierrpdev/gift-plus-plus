import React from 'react';
// import styled from 'styled-components';

// import { Panel, PanelContent } from '../panel';
// import { PanelPrompt } from '../panel-prompt';
// import { Buttons, Button } from '../buttons';
// import { AudioPlayer } from '../audio-player';

import { ReceivingIntroContent } from '../receiving/panels/intro-content';
import { ReceivingChooseLocation } from '../receiving/panels/choose-location';

/**
 * Panel container for Receiving Gift Part 1
 */

const ReceivingPart1: React.FC = () => {
  // Return all of the panels for this part
  // console.log('a');
  return (
    <>
    <ReceivingChooseLocation />
    <ReceivingIntroContent />
    </>
  );
};

export {
  ReceivingPart1,
};
