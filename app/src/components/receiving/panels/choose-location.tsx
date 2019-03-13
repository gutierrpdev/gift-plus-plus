import React from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { Buttons, Button } from '../../buttons';

/***
 * Choose location panel
 */

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
    <StyledPanel {...panelProps}>
      <PanelContent>
        <PanelPrompt text={`Are you at the ${panelProps.museumName} right now?`} background={'transparent-black'} />
      </PanelContent>
      <Buttons>
        <Button onClick={handleAtMuseum} primary={true}>Yes</Button>
        <Button onClick={handleNotAtMuseum}>No</Button>
      </Buttons>
    </StyledPanel>
  );
};

export {
  ReceivingChooseLocation,
};
