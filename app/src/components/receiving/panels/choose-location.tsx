import React /*, { useState, useEffect }*/ from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { Buttons, Button } from '../../buttons';

/***
 * Choose location panel
 */

// Todo : finish question
const ReceivingChooseLocation: React.FC<PanelProps> = (panelProps) => {

  // todo : state, bubble up
  // private const [location, setLocation] = useState('');

  // useEffect(() => {
  //   document.title = `You clicked ${location}`;
  // });

  function handleAtMuseum() {
    if (panelProps.onComplete) {
      panelProps.onComplete();
    }
  }

  function handleNotAtMuseum() {
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
