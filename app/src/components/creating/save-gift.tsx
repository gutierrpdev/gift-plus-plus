import React, { useState } from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { PanelRound } from '../panel-round';
import { Buttons, Button } from '../buttons';
import { ProgressLoader } from '../progress-loader';

/**
 * Save the gift
 */

type Status =
  | 'saving'
  | 'saving-failed'
;

interface Props {
  onComplete: () => void;
}

export const SaveGift: React.FC<Props> = ({ onComplete }) => {

  // State
  const [status, setStatus] = useState<Status>('saving');
  const [saveProgress, setSaveProgress] = useState(50);


  function renderSaving() {

    // Todo : this should be the upload to API
    setTimeout( () => {
      // Upload not successful
      // setSaveProgress(50);
      // setStatus('saving-failed');

      // Upload successful
      setSaveProgress(100);
      onComplete();
    }, 3000);

    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Saving it</PanelSubTitle>
        <PanelContent>
          <PanelRound background='transparent-black'>
            <ProgressLoader text='Saving' percent={saveProgress} colour='white' />
          </PanelRound>
        </PanelContent>
        <Buttons>
          <Button onClick={() => setStatus('saving')} primary={true}>Enter</Button>
        </Buttons>
      </Panel>
    );
  }

  function renderSavingFailed() {

    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Saving failed</PanelSubTitle>
        <PanelContent>
          <PanelPrompt text={`Please check you're connected to the internet`} />
        </PanelContent>
        <Buttons>
          <Button onClick={() => setStatus('saving')} primary={true}>Try again</Button>
          <Button>Help</Button>
        </Buttons>
      </Panel>
    );
  }

  return (
    <>
      {status === 'saving' && renderSaving()}
      {status === 'saving-failed' && renderSavingFailed()}
    </>
  );
};
