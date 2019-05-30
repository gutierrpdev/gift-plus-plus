import React from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Button } from '../buttons';
import { PanelButtons } from '../panel-buttons';

/**
 * First home intro screen
 */

interface Props {
  onComplete?: () => void; // Callback to fire when this content is complete
}

const HomeIntro1: React.FC<Props> = ({ onComplete }) => {

  function handleComplete() {
    if (onComplete) {
      onComplete();
    }
  }

  return (

    <Panel>

      <PanelContent topPosition='top-quarter'>
        <PanelPrompt
          text='Ever made
            a playlist?'
          textColor='black'
          textSize={80}
          background='solid-white'
          onClick={handleComplete}
        />
      </PanelContent>

      <PanelButtons>
        <Button onClick={handleComplete}>Continue</Button>
      </PanelButtons>

    </Panel>

  );

};

export {
  HomeIntro1,
};
