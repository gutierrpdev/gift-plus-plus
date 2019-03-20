import React, { useState } from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { PanelImageReveal } from '../../panel-image-reveal';
import { Buttons, Button } from '../../buttons';
import { AudioPlayer } from '../../../components/audio-player';
import { RecipientLocation } from './choose-location';
import { Gift, GiftPart } from '../../../domain';
import { WaitThen } from '../../wait-then';
import { GiftPartBackground } from '../gift-part-background';

/***
 * Show the gift part content, prompting for clues, etc.
 */

 // Extend panel props with extras
export interface PartContentProps extends PanelProps {
  gift: Gift; // Pass in the whole gift rather than just the part as we need some other info (part count, sender name)
  giftPartIndex: number; // The index of this gift part
  recipientLocation: RecipientLocation;
  onComplete?: () => void;
  revelImage: () => void;
}

// Todo : finish question
const ReceivingPartContent: React.FC<PartContentProps> = (props) => {

  // section is 0 based incrementer of current stage
  const [section, setSection] = useState(0);
  const [audioHasPlayed, setAudioHasPlayed] = useState(false);

  // Get some local references
  const giftPart: GiftPart = props.gift.parts[props.giftPartIndex];
  const giftPartCount: number = props.gift.parts.length;
  const giftSenderName: string = props.gift.senderName;

  // Our audio player has finished
  function handleAudioPlaybackFinished() {
    setAudioHasPlayed(true);
  }

  function gotoFindObject() {
    setSection(3);
  }

  function gotoGiveClue() {
    setSection(4);
  }

  function gotoGiveHelp() {
    setSection(5);
  }

  function gotoHereYouGo() {
    setSection(6);
  }

  function gotoFound() {
    if (props.revelImage) {
      props.revelImage();
    }
    setSection(7);
  }

  function gotoEndOfGiftPart() {
    if (props.onComplete) {
      props.onComplete();
    }
  }

  function handleContinue() {

    // todo: check for skip in global state, show button below

    // Check for special section conditions
    if (section === 3) {

      // Check if we have a clue
      if (giftPart && giftPart.clue) {
        // Skip
        setSection(5);
      } else {
        setSection(4);
      }
    } else {
      // Default is to incremene to the next section
      // Increment out section index
      const newSection = section + 1;
      setSection(newSection);
    }

  }


  function getButtons() {

    // Is there a part after this one
    const furtherPart = (giftPartCount > (props.giftPartIndex + 1));
    const nextPart = props.giftPartIndex + 2; // 1 for the index and 1 as next


    switch (section) {
      case 3: // give me a clue
        // Check if we have a clue
        const haveClue = giftPart && giftPart.clue;
        return (
          <>
            {haveClue && <Button onClick={gotoGiveClue}>Give me a clue</Button>}
            {!haveClue && <Button onClick={gotoGiveHelp}>Help</Button>}
            <Button onClick={gotoHereYouGo} primary={true}>OK</Button>
          </>
        );
      case 4: // more help
        return (
          <>
            <Button onClick={gotoFindObject} primary={true}>OK</Button>
            <Button onClick={gotoGiveHelp}>More Help</Button>
          </>
        );
      case 5: // stuck
        return (
          <Button onClick={gotoFindObject} primary={true}>OK</Button>
        );
      case 8: // senders audio message
        return (
          <>
            {audioHasPlayed && furtherPart &&
              <Button onClick={gotoEndOfGiftPart} primary={true}>Open part {nextPart}</Button>}
            {audioHasPlayed && !furtherPart &&
              <Button onClick={gotoEndOfGiftPart} primary={true}>Done</Button>}
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
        return giftPartCount === 1 ?
          'This is a sneak peek of your gift.' :
          'This is a sneak peek of the first object in your gift.';
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
        return 'Time to see if you can track it down.';
      default :
        return '';
    }
  }

  function getLookAroundText() {
    switch (props.giftPartIndex) {
      case 0 :
        return 'Wander round and tap OK when you find it.';
      case 1 :
        return 'Take a wander, when you find it – tap OK';
      case 2 :
        return 'Tap OK when you find it.';
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
        return 'The last one! Ask someone in the museum.';
      default :
        return '';
    }
  }

  function getPlaySendersMessage() {
    switch (props.giftPartIndex) {
      case 0 :
        // Text changes based on gift count and sender name
        const partCount = giftPartCount > 1 ? 'first' : '';
        return `Play ${giftSenderName}’s ${partCount} message...`;
      case 1 :
        return `Play ${giftSenderName}’s message...`;
      case 2 :
        return `Play ${giftSenderName}’s final message...`;
      default :
        return '';
    }
  }

  const giftPartPhoto = giftPart ? giftPart.photo : '';
  const defaultWait = 5;
  const showReveal = section >= 1 && section < 7;

  // Use an index to advance to next statge
  return (
    <StyledPanel visible={props.visible}>

      <PanelContent>

        {showReveal && <PanelImageReveal imageUrl={giftPartPhoto} />}
        {/* <GiftPartBackground giftPart={giftPart} /> */}

        {/* start */}
        {section === 0 &&
          <>
            <PanelPrompt text={getIntroText()} background={'transparent-black'}  />
            <WaitThen
              wait={defaultWait}
              andThen={handleContinue}
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
            <PanelPrompt text={getDoYouNeedaClueText()} background={'transparent-black'}/>
            <WaitThen
              wait={defaultWait}
              andThen={handleContinue}
            />
          </>
        }

        {/* wander/look around */}
        {section === 3 &&
          <PanelPrompt text={getLookAroundText()} background={'transparent-black'} />
        }

        {/* show clue */}
        {section === 4 &&
          <PanelPrompt text={giftPart.clue} background={'transparent-black'} />
        }

        {/* need help */}
        {section === 5 &&
          <PanelPrompt text={getNeedHelpText()} background={'transparent-black'}/>
        }

        {/* here is help */}
        {section === 6 &&
          <>
            <PanelPrompt text={'Here you go...'} background={'transparent-black'} />
            <WaitThen
              wait={defaultWait}
              andThen={gotoFound}
            />
          </>
        }

        {/* show full photo */}
        {section === 7 &&
          <>
            {/* <PanelImage imageUrl={giftPartPhoto} /> */}
            <WaitThen
              wait={defaultWait}
              andThen={handleContinue}
            />
          </>
        }

        {/* play audio */}
        {section === 8 &&
          <AudioPlayer
            text={getPlaySendersMessage()}
            src={giftPart.note}
            forwardButton={'GoToEnd'}
            onPlaybackComplete={handleAudioPlaybackFinished}
          />
        }

      </PanelContent>

      <Buttons>
        {getButtons()}
      </Buttons>

    </StyledPanel>
  );
};

export {
  ReceivingPartContent,
};
