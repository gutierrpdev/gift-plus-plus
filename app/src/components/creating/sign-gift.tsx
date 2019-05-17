import React, { useState } from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { TextInputModal } from '../modals/text-input-modal';

/**
 * Sign the gift.  Sender enters their name.
 */

interface Props {
  onComplete: (senderName: string) => void;
}

export const SignGift: React.FC<Props> = ({ onComplete }) => {

  // State
  const [showingEnterName, setShowingEnterName] = useState(false);

  return (
    <>

      {showingEnterName &&
        <TextInputModal
          placeHolder='Write your firt name'
          onSaveClick={(name) => { onComplete(name); }}
          onCancelClick={() => { setShowingEnterName(false); }}
        />
      }

      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Sign it</PanelSubTitle>
        <PanelContent>
          <PanelPrompt
            text={'Now say who the gift is from'}
            background={'transparent-black'}
            onClick={() => { setShowingEnterName(true); }}
          />
        </PanelContent>
        <Buttons>
          <Button onClick={() => { setShowingEnterName(true); }} primary={true}>Write your first name</Button>
        </Buttons>
      </Panel>

    </>
  );

};
