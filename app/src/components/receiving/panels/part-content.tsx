import React, { useState } from 'react';

import { assetStore } from '../../../services';

import { Panel, PanelContent } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { PanelButtons } from '../../panel-buttons';
import { Button } from '../../buttons';
import { AudioPlayer } from '../../media/audio-player';
import { RecipientLocation } from '../../choose-location';
import { Gift, GiftPart } from '../../../domain';
import { WaitThen, WaitThenShow } from '../../utils/wait-then';
import history from '../../../utils/router-history';
import {
  track,
  receivingGiftClueRequestedEvent,
  receivingGiftFoundPartEvent,
  giftReceiveCompleteGoHomePressedEvent,
} from '../../../utils/events';

/**
 * Show the gift part content, prompting for clues, etc.
 */


export interface PartContentProps {
  gift: Gift; // The gift in question, as we need some other info (part count, sender name)
  giftPartIndex: number; // The index of this gift part
  recipientLocation: RecipientLocation; // At the museum or not
  onComplete?: () => void; // Callback to call when complete
  revealPreviewImage: () => void; // Callback reveal the preview circle
  revealBackgroundImage: () => void; // Callback reveal the entire background image
}

const ReceivingPartContent: React.FC<PartContentProps> = (props) => {

  const [section, setSection] = useState(getInitialSection()); // Note: Section is 0 based incrementer of current stage
  const [audioPlaybackComplete, setAudioPlaybackComplete] = useState(false);
  const [outroAudioPlaybackFinished, setOutroAudioPlaybackFinished] = useState(false);

  // Get some local references
  const giftPart: GiftPart = props.gift.parts[props.giftPartIndex];
  const giftPartCount: number = props.gift.parts.length;
  const giftSenderName: string = props.gift.senderName;
  const atMuseum = (props.recipientLocation === 'at-museum');
  const museumGift = (props.gift.kind === 'MuseumGift');

  // Our audio player has finished
  function handleAudioPlaybackFinished() {
    setAudioPlaybackComplete(true);
  }

  // Return the initial section index
  // Differs based on user location
  function getInitialSection() {

    // When at the museum start at the beginning
    if (props.recipientLocation === 'at-museum') {
      return 0;
    }

    // If not at the museum jump straight to the reveal
    if (props.revealBackgroundImage) {
      props.revealBackgroundImage();
    }
    return 7;
  }

  // Show the preview image circle
  function revealPreviewImage() {

    // Fire the call back
    if (props.revealPreviewImage) {
      props.revealPreviewImage();
    }

    // Set our section
    setSection(1);
  }

  function gotoFindObject() {
    setSection(3);
  }

  function gotoGiveClueSearch() {

    // Record the event
    track(receivingGiftClueRequestedEvent( {giftId: props.gift.id, partNumber: props.giftPartIndex + 1} ));

    // Show the section
    setSection(4);
  }

  function gotoGiveHelp() {
    setSection(5);
  }

  function gotoHereYouGo() {

    // Record the event
    track(receivingGiftFoundPartEvent( {giftId: props.gift.id, partNumber: props.giftPartIndex + 1} ));

    // Show the section
    setSection(6);
  }

  function gotoFound() {
    if (props.revealBackgroundImage) {
      props.revealBackgroundImage();
    }
    setSection(7);
  }

  function gotoFoundAudio() {
    setSection(8);
  }

  // function gotoGiveClueFound() {
  //   setSection(9);
  // }

  function gotoOutro() {
    setSection(10);
  }

  function gotoEndOfGiftPart() {

    // If on the last part show the outro
    const lastGiftPart = (props.giftPartIndex + 1 === giftPartCount);
    if (lastGiftPart) {
      gotoOutro();
    } else {

      // Callback
      if (props.onComplete) {
        props.onComplete();
      }

    }

  }

  function handleOutroContinue() {

    // Track go home event
    track(giftReceiveCompleteGoHomePressedEvent( {giftId: props.gift.id} ));

    // Go to the home screen
    history.push('/');

  }


  function handleContinue() {

    // Check for special section conditions
    if (section === 3) {

      // Check if we have a clue
      if (giftPart && giftPart.clue.trim()) {
        // Skip
        setSection(5);
      } else {
        setSection(4);
      }
    } else {
      // Default is to incremene to the next section
      // Increment our section index
      const newSection = section + 1;
      setSection(newSection);
    }

  }


  function getButtons() {

    // Is there a part after this one
    const furtherPart = (giftPartCount > (props.giftPartIndex + 1));

    // Check if we have a clue
    const haveClue = giftPart && giftPart.clue.trim();

    switch (section) {
      case 3: // give me a clue

        return (
          <>
            {haveClue && <Button onClick={gotoGiveClueSearch}>Show clue</Button>}
            {!haveClue && <Button onClick={gotoGiveHelp}>Help</Button>}
            <Button onClick={gotoHereYouGo} primary={true}>Found it</Button>
          </>
        );
      case 4: // more help
        return (
          <>
            <Button onClick={gotoFindObject} primary={true}>OK</Button>
            <Button onClick={gotoGiveHelp}>More help</Button>
          </>
        );
      case 5: // stuck
        return (
          <Button onClick={gotoFindObject} primary={true}>OK</Button>
        );
      case 7: // found

        // If not at museum wait 3 seconds before showing the continue button
        const wait = atMuseum ? 0 : 3;

        return (
          <WaitThenShow
            wait={wait}
          >
            <Button onClick={handleContinue} primary={true}>Continue</Button>
          </WaitThenShow>
        );
      case 8: // senders audio message

        // Different text based on gift part
        // Note: This is never shown on the last part, so no need to consider that case
        const openPartText = (props.giftPartIndex === 1) ? 'Open last part' : 'Open part two';

        return (
          <>
            {audioPlaybackComplete && furtherPart &&
              <Button onClick={gotoEndOfGiftPart} primary={true}>{openPartText}</Button>}
            {audioPlaybackComplete && !furtherPart &&
              <Button onClick={gotoEndOfGiftPart} primary={true}>Done</Button>}
          </>
        );
      case 9: // clue (found)
        return (
          <Button onClick={gotoFoundAudio} primary={true}>OK</Button>
        );
      case 11: // outro audio
        return (
          <>
            {outroAudioPlaybackFinished && <Button primary={true} onClick={handleOutroContinue}>Done</Button>}
          </>
        );
      default :
        // One invisible button to occupy space
        return (
          null
        );
    }
  }

  function getIntroText() {
    switch (props.giftPartIndex) {
      case 0 :
        // Text changes based on gift count
        return giftPartCount === 1
          ? 'This is a sneak peek of your gift'
          : 'This is a sneak peek of the first object in your gift';
      case 1 :
        return 'Here’s a preview of the second object in your gift...';
      case 2 :
        return 'Here’s a glimpse of your last object...';
      default :
        return '';
    }
  }

  function getDoYouNeedaClueText() {
    switch (props.giftPartIndex) {
      case 0 :
        return 'Do you know where to look?';
      case 1 :
        return 'Any ideas?';
      case 2 :
        return 'Time to see if you can track it down';
      default :
        return '';
    }
  }

  function getLookAroundText() {
    switch (props.giftPartIndex) {
      case 0 :
        return 'Wander round and tap the button when you find it';
      case 1 :
        return 'Take a wander. When you find the object tap the button';
      case 2 :
        return 'Tap the button when you find it';
      default :
        return '';
    }
  }

  function getNeedHelpText() {
    switch (props.giftPartIndex) {
      case 0 :
        return 'Stuck? Try asking someone in the museum';
      case 1 :
        return 'Oh dear. Find someone in the museum to help?';
      case 2 :
        return 'The last one! Ask someone in the museum';
      default :
        return '';
    }
  }

  function getPreFindText() {
    switch (props.giftPartIndex) {
      case 0 :
        return 'Well done!';
      case 1 :
        return 'Good work!';
      case 2 :
        return 'Excellent';
      default :
        return '';
    }
  }

  function getPlaySendersMessage() {
    switch (props.giftPartIndex) {
      case 0 :
        // Text changes based on gift count and sender name
        const partCount = giftPartCount > 1 ? 'first' : '';
        return `${giftSenderName}’s ${partCount} message for you...`;
      case 1 :
        return `${giftSenderName}’s message to you...`;
      case 2 :
        return `${giftSenderName}’s final message to you...`;
      default :
        return '';
    }
  }

  function getOutroAudioPlayerReference() {
    return atMuseum
      ? museumGift
        ? 'receiving-outro-at-museum-museum-gift'
        : 'receiving-outro-at-museum-personal-gift'
      : museumGift
        ? 'receiving-outro-not-at-museum-museum-gift'
        : 'receiving-outro-not-at-museum-personal-gift';
  }

  function getOutroAudioFile() {
    // todo update these audio files
    return atMuseum
      ? museumGift
        ? assetStore.assets.rOutroAtMuseumMuseumGift
        : assetStore.assets.rOutroAtMuseumPersonalGift
      // not at museum
      : museumGift
        ? assetStore.assets.rOutroNotAtMuseumMuseumGift
        : assetStore.assets.rOutroNotAtMuseumPersonalGift;
  }

  // Calculate some things
  const defaultWait = 5;

  // Use an index to advance to next statge
  return (
    <Panel isParent={false}>

      <PanelContent>

        {/* start */}
        {section === 0 &&
          <>
            <PanelPrompt
              text={getIntroText()}
              background={'transparent-black'}
              onClick={revealPreviewImage}
            />
            <WaitThen
              wait={defaultWait}
              andThen={revealPreviewImage}
            />
          </>
        }

        {/* reveal photo */}
        {section === 1 &&
          <>
            <WaitThen
              wait={defaultWait}
              andThen={handleContinue}
            />
          </>
        }

        {/* do you know where to lookk/need a clue ? */}
        {section === 2 &&
          <>
            <PanelPrompt
              text={getDoYouNeedaClueText()}
              background={'transparent-black'}
              onClick={handleContinue}
            />
            <WaitThen
              wait={defaultWait}
              andThen={handleContinue}
            />
          </>
        }

        {/* wander/look around */}
        {section === 3 &&
          <PanelPrompt
            text={getLookAroundText()}
            background={'transparent-black'}
          />
        }

        {/* show clue (search) */}
        {section === 4 &&
          <PanelPrompt text={giftPart.clue} background={'transparent-black'} />
        }

        {/* need help */}
        {section === 5 &&
          <PanelPrompt text={getNeedHelpText()} background={'transparent-black'} />
        }

        {/* here is help */}
        {section === 6 &&
          <>
            <PanelPrompt
              text={getPreFindText()}
              background={'transparent-black'}
              onClick={gotoFound}
            />
            <WaitThen
              wait={defaultWait}
              andThen={gotoFound}
            />
          </>
        }

        {/* show full photo, section 7, nothing to show */}

        {/* play audio */}
        {section === 8 &&
          <AudioPlayer
            message={getPlaySendersMessage()}
            src={giftPart.note}
            forwardButtonType={'go-to-end'}
            onPlaybackComplete={handleAudioPlaybackFinished}
          />
        }

        {/* show clue (found) */}
        {section === 9 &&
          <PanelPrompt text={giftPart.clue} background={'transparent-black'} />
        }

        {/* outro - you've unwrapped the whole gift */}
        {section === 10 &&
        <>
          <PanelPrompt
            text='You’ve unwrapped the whole gift'
            background={'transparent-black'}
          />
          <WaitThen
            wait={defaultWait}
            andThen={handleContinue}
          />
        </>
        }

        {/* outro - audio */}
        {section === 11 &&
        <AudioPlayer
          message={`Ready for
            the last bit?`}
          src={getOutroAudioFile()}
          forwardButtonType={'go-to-end'}
          onPlaybackComplete={() => {setOutroAudioPlaybackFinished(true); }}
        />
        }

      </PanelContent>

      <PanelButtons>
        {getButtons()}
      </PanelButtons>

    </Panel>
  );
};

export {
  ReceivingPartContent,
};
