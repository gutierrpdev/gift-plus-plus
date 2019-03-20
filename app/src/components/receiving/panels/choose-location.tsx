import React from 'react';
import styled from 'styled-components';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { Buttons, Button } from '../../buttons';

/***
 * Choose location panel
 */

const PinImg = styled.img`
  margin-top: 5%;
  max-width: 30%;
`;

 // Define our receiving locations
export type RecipientLocation = 'Unknown' | 'AtMuseum' | 'NotAtMuseum';

// Extend panel props with extras
export interface ChooseLocationProps extends PanelProps {
  museumName: string;
  doSetLocation: (recipientLocation: RecipientLocation) => void; // Callback to the parent
}

// Todo : finish question
const ReceivingChooseLocation: React.FC<ChooseLocationProps> = (panelProps) => {

  function handleAtMuseum() {
    // Set Location callback
    if (panelProps.doSetLocation) {
      panelProps.doSetLocation('AtMuseum');
    }

  }

  function handleNotAtMuseum() {
    // Set Location callback
    if (panelProps.doSetLocation) {
      panelProps.doSetLocation('NotAtMuseum');
    }

  }

  return (
    <StyledPanel visible={panelProps.visible}>
      <PanelContent>
        <PanelPrompt
          text={`Are you at the ${panelProps.museumName} right now?`}
          background={'transparent-black'}
        >
          <PinImg src={require('../../../assets/svg/pin.svg')} />
        </PanelPrompt>
      </PanelContent>
      <Buttons>
        <Button onClick={handleNotAtMuseum}>No</Button>
        <Button onClick={handleAtMuseum} primary={true}>Yes</Button>
      </Buttons>
    </StyledPanel>
  );
};

export {
  ReceivingChooseLocation,
};
