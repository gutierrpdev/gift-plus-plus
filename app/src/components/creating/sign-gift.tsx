import React, { useState } from 'react';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPlus } from '../panel-plus';
import { Buttons, Button } from '../buttons';
import { TextInput } from '../inputs/text-input';

/**
 * Sign the gift
 */

type Status =
  | 'first-message'
  | 'enter-name'
;

interface Props {
  onComplete: (senderName: string) => void;
}

export const SignGift: React.FC<Props> = ({ onComplete }) => {
  const [status, setStatus] = useState<Status>('first-message');
  const [senderName, setSenderName] = useState('');

  function renderFirstMessage() {
    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Sign it</PanelSubTitle>
        <PanelContent>
          <PanelPlus text={'Now sign your gift'} onClick={() => {setStatus('enter-name'); }} />
        </PanelContent>
        <Buttons>
          <Button onClick={() => setStatus('enter-name')} primary={true}>Add my name</Button>
        </Buttons>
      </Panel>
    );
  }

  function renderEnterName() {
    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Sign it</PanelSubTitle>
        <PanelContent>
          <TextInput
            placeHolder={'Your first name'}
            onTextChanged={setSenderName}
          />
        </PanelContent>
        <Buttons>
          {senderName &&
           <Button onClick={() => onComplete(senderName)} primary={true}>Enter</Button>
          }
        </Buttons>
      </Panel>
    );
  }

  return (
    <>
      {status === 'first-message' && renderFirstMessage()}
      {status === 'enter-name' && renderEnterName()}
    </>
  );
};
