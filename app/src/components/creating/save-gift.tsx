import React, { useEffect } from 'react';

import { assertNever } from '../../utils/helpers';
import history from '../../utils/router-history';
import { InProgressGift, Gift } from '../../domain';
import { api } from '../../services';
import { useGiftSaver } from '../../services/gift-saver';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { PanelRound } from '../panel-round';
import { Buttons, Button } from '../buttons';
import { ProgressLoader } from '../progress-loader';
import { track, savingGiftAttemptedEvent, savingGiftSucceededEvent, savingGiftFailedEvent } from '../../utils/events';


interface Props {
  gift: InProgressGift;
  onComplete: (gift: Gift) => void;
}

export const SaveGift: React.FC<Props> = ({ gift, onComplete }) => {
  const state = useGiftSaver(gift);
  console.log(state);

  useEffect(() => {
    if (state.kind === 'done') {
      track(savingGiftSucceededEvent({ giftId: gift.id }));
      onComplete(state.gift);
    }
    if (state.kind === 'invalid-gift') track(savingGiftFailedEvent({ giftId: gift.id }));
    if (state.kind === 'uploading-assets-error') track(savingGiftFailedEvent({ giftId: gift.id }));
    if (state.kind === 'saving-gift-error') track(savingGiftFailedEvent({ giftId: gift.id }));
  });


  if (state.kind === 'uploading-assets') {
    return <SavingInProgress text='Uploading assets' progress={state.progress} />;
  }
  if (state.kind === 'saving-gift' || state.kind === 'done') {
    return <SavingInProgress text='Processing gift... please be patient' />;
  }

  if (state.kind === 'invalid-gift') {
    // This state shouldn't happen, but show something just in case
    return (
      <SavingFailed
        text='Unfortunately this gift has failed'
        buttonText='Home'
        onClick={() => history.push('/')}
      />
    );
  }
  if (state.kind === 'uploading-assets-error') {
    return <SavingFailed buttonText='Try again' onClick={state.retry} />;
  }
  if (state.kind === 'saving-gift-error') {
    return <SavingFailed buttonText='Try again' onClick={state.retry} />;
  }

  return assertNever(state);
};



interface SavingInProgressProps {
  text: string;
  progress?: number;
}
const SavingInProgress: React.FC<SavingInProgressProps> = ({ text, progress }) => (
  <Panel>
    <PanelTitle>Finish your gift</PanelTitle>
    <PanelSubTitle>Saving it</PanelSubTitle>
    <PanelContent>
      <PanelRound background='transparent-black'>
        <ProgressLoader text={text} percent={progress} colourTheme='white' />
      </PanelRound>
    </PanelContent>
    <Buttons>
    </Buttons>
  </Panel>
);


interface SavingFailedProps {
  text?: string;
  buttonText: string;
  onClick: () => void;
}
const SavingFailed: React.FC<SavingFailedProps> = ({ text, buttonText, onClick }) => (
  <Panel>
    <PanelTitle>Finish your gift</PanelTitle>
    <PanelSubTitle>Saving failed</PanelSubTitle>
    <PanelContent>
      <PanelRound background='transparent-black'>
        <PanelPrompt text={text || `Please check you're connected to the internet`} />
      </PanelRound>
    </PanelContent>
    <Buttons>
      <Button onClick={onClick} primary={true}>{buttonText}</Button>
    </Buttons>
  </Panel>
);
