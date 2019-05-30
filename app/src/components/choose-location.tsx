import React from 'react';

import { events } from '../services';

import { Panel, PanelContent } from './panel';
import { PanelPrompt } from './panel-prompt';
import { PanelButtons } from './panel-buttons';
import { Button } from './buttons';

/***
 * Choose location panel
 */

// Define our receiving locations
export type RecipientLocation = 'unknown' | 'at-museum' | 'not-at-museum';

export interface ChooseLocationProps {
  museumName: string;
  doSetLocation: (recipientLocation: RecipientLocation) => void; // Callback to the parent
}

const ChooseLocation: React.FC<ChooseLocationProps> = (props) => {

  function handleAtMuseum(): void {
    events.track('h-at-museum-confirmed', { atMuseum: true });

    if (props.doSetLocation) {
      props.doSetLocation('at-museum');
    }
  }

  function handleNotAtMuseum(): void {
    events.track('h-at-museum-confirmed', { atMuseum: false });

    if (props.doSetLocation) {
      props.doSetLocation('not-at-museum');
    }
  }

  return (
    <Panel>
      <PanelContent topPosition='top-quarter'>
        <PanelPrompt
          text={`Are you at ${props.museumName} right now?`}
          background={'transparent-black'}
        />
      </PanelContent>
      <PanelButtons>
        <Button onClick={handleNotAtMuseum}>No</Button>
        <Button onClick={handleAtMuseum} primary={true}>Yes</Button>
      </PanelButtons>
    </Panel>
  );
};

export {
  ChooseLocation,
};
