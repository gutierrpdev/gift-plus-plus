import React from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons } from '../buttons';
import { WaitThen } from '../utils/wait-then';

/**
 * First home intro screen
 */

interface Props {
  onComplete: () => void; // Callback to fire when this content is complete
}

const HomeIntro1: React.FC<Props> = ({ onComplete }) => {

  // Locals
  const defaultWait = 5;

  function handleComplete() {
    if (onComplete) {
      onComplete();
    }
  }

  return (

    <Panel>

      <PanelContent>
        <PanelPrompt
          text='Ever made
            a playlist?'
          textColor='black'
          textSize={80}
          background='solid-white'
          onClick={handleComplete}
        />
      </PanelContent>

      <Buttons />

      <WaitThen
        wait={defaultWait}
        andThen={handleComplete}
      />

    </Panel>

  );

};

export {
  HomeIntro1,
};
