import React, { useState } from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { PanelImage } from '../../panel-image';
import { Buttons, Button } from '../../buttons';
import { AudioPlayer, AudioPlayerForwardButton } from '../../../components/audio-player';
import { GiftLocation } from './choose-location';
import { Gift, GiftPart } from '../../../domain';
import { WaitThen } from '../../wait-then';

/***
 * Show the gift part content, prompting for clues, etc.
 */

 // Extend panel props with extras
export interface PartContentProps extends PanelProps {
  gift: Gift; // Pass in the whole gift rather than just the part as we need some other info (part count, sender name)
  giftPartIndex: number; // The index of this gift part
  giftLocation: GiftLocation;
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

  function gotoFound() {
    setSection(7);
  }

  function gotoEndOfGiftPart() {
    alert('This part is complete');
    if (props.doComplete) {
      props.doComplete();
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

    // todo check for last section and continue
    // if (props.doComplete) {
    //   props.doComplete();
    // }
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
            <Button onClick={gotoFound} primary={true}>OK</Button>
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
            {!audioHasPlayed && <Button invisible={true}>&nbsp;</Button>}
            {audioHasPlayed && furtherPart &&
              <Button onClick={gotoEndOfGiftPart} primary={true}>Open part {nextPart}</Button>}
            {audioHasPlayed && !furtherPart &&
              <Button onClick={gotoEndOfGiftPart} primary={true}>Done</Button>}
          </>
        );
      default :
        // One invisible button to occupy space
        return (
          <Button invisible={true}>&nbsp;</Button>
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
      default :
        return '';
    }
  }

  const giftPartPhoto = giftPart ? giftPart.photo : '';

  // Use an index to advance to next statge
  return (
    <StyledPanel {...props}>

      <PanelContent>

        {/* start */}
        {section === 0 &&
          <>
            <PanelPrompt text={getIntroText()}  />
            <WaitThen
              wait={1}
              andThen={handleContinue}
            />
          </>
        }

        {/* reveal photo */}
        {section === 1 &&
          <>
            <PanelImage imageSrc={giftPartPhoto} />
            <WaitThen
              wait={1}
              andThen={handleContinue}
            />
          </>
        }

        {/* do you know where to lookk/need a clue ? */}
        {section === 2 &&
          <>
            <PanelPrompt text={getDoYouNeedaClueText()} />
            <WaitThen
              wait={1}
              andThen={handleContinue}
            />
          </>
        }

        {/* wander/look around */}
        {section === 3 &&
          <PanelPrompt text={getLookAroundText()} />
        }

        {/* show clue */}
        {section === 4 &&
          <PanelPrompt text={giftPart.clue} />
        }

        {/* need help */}
        {section === 5 &&
          <PanelPrompt text={getNeedHelpText()} />
        }

        {/* here is help */}
        {section === 6 &&
          <>
            <PanelPrompt text={'Here you go...'} />
            <WaitThen
              wait={1}
              andThen={handleContinue}
            />
          </>
        }

        {/* show full photo */}
        {section === 7 &&
          <>
            <PanelPrompt text={'PHOTO'} />
            <WaitThen
              wait={1}
              andThen={handleContinue}
            />
          </>
        }

        {/* play audio */}
        {section === 8 &&
          <AudioPlayer
            text={getPlaySendersMessage()}
            src={giftPart.note}
            forwardButton={AudioPlayerForwardButton.GoToEnd}
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
