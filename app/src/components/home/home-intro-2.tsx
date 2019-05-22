import React from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons  } from '../buttons';
import { WaitThen } from '../utils/wait-then';

/**
 * Second home intro screen
 */

interface Props {
  onComplete: () => void; // Callback to fire when this content is complete
}

const HomeIntro2: React.FC<Props> = ({ onComplete }) => {

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
          text='How about
            from objects
            in a museum?'
          textColor='black'
          textSize={70}
          background='solid-white'
          onClick={handleComplete}
        />
      </PanelContent>

      <WaitThen
        wait={defaultWait}
        andThen={handleComplete}
      />

    </Panel>

  );

};

export {
  HomeIntro2,
};
