import React from 'react';
// import styled from 'styled-components';

// import { Panel, PanelContent } from '../panel';
// import { PanelPrompt } from '../panel-prompt';
// import { Buttons, Button } from '../buttons';
// import { AudioPlayer } from '../audio-player';

import { ReceivingIntroContent } from '../receiving/intro-content';
import { ReceivingChooseLocation } from '../receiving/choose-location';

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
