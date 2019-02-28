import React from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { Buttons, Button } from '../../buttons';

/***
 * Choose location panel
 */

 // Define our receiving locations
export enum GiftLocation {Unknown, AtMuseum, NotAtMuseum}

// Extend panel props with extras
export interface ChooseLocationProps extends PanelProps {
  doSetLocation: (giftLocation: GiftLocation) => void; // Callback to the parent
}

// Todo : finish question
const ReceivingChooseLocation: React.FC<ChooseLocationProps> = (panelProps) => {

  function handleAtMuseum() {
    // setLocation(GiftLocation.AtMuseum);
    // Set Location callback
    if (panelProps.doSetLocation) {
      panelProps.doSetLocation(GiftLocation.AtMuseum);
    }

    // And finish
    if (panelProps.doComplete) {
      panelProps.doComplete();
    }
  }

  function handleNotAtMuseum() {
    // setLocation(GiftLocation.NotAtMuseum);
    // Set Location callback
    if (panelProps.doSetLocation) {
      panelProps.doSetLocation(GiftLocation.NotAtMuseum);
    }

    // And finish
    if (panelProps.doComplete) {
      panelProps.doComplete();
    }
  }

  return (
    <StyledPanel {...panelProps}>
      <PanelContent>
        <PanelPrompt text={'Are you at the museum?'} />
      </PanelContent>
      <Buttons>
        <Button onClick={handleAtMuseum}>Yes</Button>
        <Button onClick={handleNotAtMuseum}>No</Button>
      </Buttons>
    </StyledPanel>
  );
};

export {
  ReceivingChooseLocation,
};
