import React from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { Buttons, Button } from '../../buttons';
import SvgPin from '../../svg/pin';

/***
 * Choose location panel
 */

const PinImg = styled.div`
  margin-top: 5%;
  width: 30%;
`;

 // Define our receiving locations
export type RecipientLocation = 'Unknown' | 'AtMuseum' | 'NotAtMuseum';

export interface ChooseLocationProps {
  visible?: boolean;
  museumName: string;
  doSetLocation: (recipientLocation: RecipientLocation) => void; // Callback to the parent
}

// Todo : finish question
const ReceivingChooseLocation: React.FC<ChooseLocationProps> = (props) => {

  function handleAtMuseum() {
    // Set Location callback
    if (props.doSetLocation) {
      props.doSetLocation('AtMuseum');
    }

  }

  function handleNotAtMuseum() {
    // Set Location callback
    if (props.doSetLocation) {
      props.doSetLocation('NotAtMuseum');
    }

  }

  return (
    <Panel visible={props.visible}>
      <PanelContent>
        <PanelPrompt
          text={`Are you at the ${props.museumName} right now?`}
          background={'transparent-black'}
          allowCompactRound={true}
        >
          <PinImg>
            <SvgPin />
          </PinImg>
        </PanelPrompt>
      </PanelContent>
      <Buttons>
        <Button onClick={handleNotAtMuseum}>No</Button>
        <Button onClick={handleAtMuseum} primary={true}>Yes</Button>
      </Buttons>
    </Panel>
  );
};

export {
  ReceivingChooseLocation,
};
