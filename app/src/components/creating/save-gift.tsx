import React, { useState, useEffect } from 'react';

import { LocalFile, InProgressGift, Gift } from '../../domain';
import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { PanelPrompt } from '../panel-prompt';
import { PanelRound } from '../panel-round';
import { Buttons, Button } from '../buttons';
import { ProgressLoader } from '../progress-loader';
import { track, savingGiftAttemptedEvent, savingGiftSucceededEvent, savingGiftFailedEvent } from '../../utils/events';

import { api } from '../../services';

/**
 * Save the gift
 */

type Status =
  | 'saving'
  | 'saving-failed'
;

interface Props {
  gift: InProgressGift;
  onComplete: (gift: Gift) => void;
}

export const SaveGift: React.FC<Props> = ({ gift, onComplete }) => {

  // State
  const [status, setStatus] = useState<Status>('saving');
  const [saveProgress, setSaveProgress] = useState(0);

  useEffect(() => {
    (async () => {
      if (!gift.recipientName) throw new Error('TODO');
      if (!gift.senderName) throw new Error('TODO');

      if (!gift.recipientGreeting) throw new Error('TODO');
      const rgUpload = await uploadAsset(gift.recipientGreeting);
      setSaveProgress(20);

      const partsUpload = [];

      for (const part of gift.parts) {
        const photoUpload = await uploadAsset(part.photo);
        const noteUpload = await uploadAsset(part.note);
        partsUpload.push({
          photo: photoUpload.fileName,
          note: noteUpload.fileName,
          clue: part.clue,
        });
      }
      setSaveProgress(80);

      const createGiftResult = await api.createGift({
        id: gift.id,
        museumId: gift.museumId,
        recipientName: gift.recipientName,
        recipientGreeting: rgUpload.fileName,
        senderName: gift.senderName,
        parts: partsUpload,
      });

      // console.log(createGiftResult);

      if (createGiftResult.kind !== 'ok') throw new Error('TODO');
      const newGift = createGiftResult.data;

      setSaveProgress(100);

      return newGift;
    })()
      .then((newGift) => {
        track(savingGiftSucceededEvent({ giftId: gift.id }));
        onComplete(newGift);
      })
      .catch(() => {
        // console.error(err);
        track(savingGiftFailedEvent({ giftId: gift.id }));
        setStatus('saving-failed');
      });
  }, []);

  function renderSaving() {
    return (
      <Panel>
        <PanelTitle>Finish your gift</PanelTitle>
        <PanelSubTitle>Saving it</PanelSubTitle>
        <PanelContent>
          <PanelRound background='transparent-black'>
            <ProgressLoader text='Saving' percent={saveProgress} colourTheme='white' />
          </PanelRound>
        </PanelContent>
        <Buttons>
          {/* <Button onClick={() => setStatus('saving')} primary={true}>Enter</Button> */}
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
          <PanelRound background='transparent-black'>
            <PanelPrompt text={`Please check you're connected to the internet`} />
          </PanelRound>
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




async function uploadAsset(file: LocalFile) {
  const preparedUploadResult = await api.createPreparedUpload({
    mimeType: file.mimeType,
  });
  if (preparedUploadResult.kind !== 'ok') throw new Error('TODO');

  const preparedUpload = preparedUploadResult.data;
  // console.log(preparedUpload);

  const blob = await fetch(file.url).then((resp) => {
    if (!resp.ok) throw new Error('TODO');
    return resp.blob();
  });
  // console.log(blob);

  const formData = new FormData();
  Object.entries(preparedUpload.postFields).forEach(
    ([k, v]) => formData.append(k, v),
  );
  formData.append('file', blob);

  const uploadResp = await fetch(preparedUpload.postUrl, {
    method: 'POST',
    body: formData,
  });

  // console.log(uploadResp);

  if (!uploadResp.ok) {
    const respText = await uploadResp.text();
    throw new Error(`Upload failed [${uploadResp.status}]: ${respText}`);
  }

  return preparedUpload;
}
