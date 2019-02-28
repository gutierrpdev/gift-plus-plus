import React, { useState } from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { PanelPrompt } from '../../panel-prompt';
import { PanelImage } from '../../panel-image';
import { Buttons, Button } from '../../buttons';
import { AudioPlayer } from '../../../components/audio-player';
import { GiftLocation } from './choose-location';
import { GiftPart } from '../../../domain';
import { WaitThen } from '../../wait-then';

/***
 * Show the gift part content, prompting for clues, etc.
 */

 // Extend panel props with extras
export interface PartContentProps extends PanelProps {
  giftPart?: GiftPart; // The gift part
  giftPartIndex?: number; // The index of this gift part
  giftPartCount?: number; // Total number of gift parts
  giftLocation: GiftLocation;
}

// Todo : finish question
const ReceivingPartContent: React.FC<PartContentProps> = (panelProps) => {

  // section is 0 based incrementer of current stage
  const [section, setSection] = useState(0);

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

  function handleContinue() {

    // todo: check for skip in global state, show button below

    // Check for special section conditions
    if (section === 3) {

      // Check if we have a clue
      if (panelProps.giftPart && panelProps.giftPart.clue) {
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
    // if (panelProps.onComplete) {
    //   panelProps.onComplete();
    // }
  }

  function getButtons() {
    switch (section) {
      case 3: // give me a clue
        // Check if we have a clue
        const haveClue = panelProps.giftPart && panelProps.giftPart.clue;
        return (
          <>
            {haveClue && <Button onClick={gotoGiveClue}>Give me a clue</Button>}
            {!haveClue && <Button onClick={gotoGiveHelp}>Help</Button>}
            <Button onClick={gotoFound}>OK</Button>
          </>
        );
      case 4: // more help
        // Check if we have a clue
        return (
          <>
            <Button onClick={gotoFindObject}>OK</Button>
            <Button onClick={gotoGiveHelp}>More Help</Button>
          </>
        );
      case 5: // stuck
        // Check if we have a clue
        return (
          <Button onClick={gotoFindObject}>OK</Button>
        );
      default :
        // One invisible button to occupy space
        return (
          <Button invisible={true}>&nbsp;</Button>
        );
    }
  }

  function getIntroText() {
    switch (panelProps.giftPartIndex) {
      case 0 :
        // Text changes based on gift count
        return panelProps.giftPartCount === 1 ?
          'This is a sneak peek of your gift.' :
          'This is a sneak peek of the first object in your gift.';
      default :
        return '';
    }
  }

  function getDoYouNeedaClueText() {
    switch (panelProps.giftPartIndex) {
      case 0 :
        return 'Do you know where to look?';
      case 1 :
        return 'Any ideas?';
      default :
        return '';
    }
  }

  function getLookAroundText() {
    switch (panelProps.giftPartIndex) {
      case 0 :
        return 'Wander round and tap OK when you find it.';
      case 1 :
        return 'Take a wander, when you find it – tap OK';
      default :
        return '';
    }
  }

  function getNeedHelpText() {
    switch (panelProps.giftPartIndex) {
      case 0 :
        return 'Stuck? Try asking someone in the museum';
      case 1 :
        return 'Oh dear. Find someone in the museum to help?';
      default :
        return '';
    }
  }

  const giftPartPhoto = panelProps.giftPart ? panelProps.giftPart.photo : '';

  // Use an index to advance to next statge
  return (
    <StyledPanel {...panelProps}>

      <PanelContent>

        {/* intro */}
        {section === 0 &&
          <>
            <PanelPrompt text={getIntroText()}  />
            <WaitThen
              wait={5}
              andThen={handleContinue}
            />
          </>
        }

        {/* reveal photo */}
        {section === 1 &&
          <>
            <PanelImage imageSrc={giftPartPhoto} />
            <WaitThen
              wait={5}
              andThen={handleContinue}
            />
          </>
        }

        {/* do you need a clue ? */}
        {section === 2 &&
          <>
            <PanelPrompt text={getDoYouNeedaClueText()} />
            <WaitThen
              wait={5}
              andThen={handleContinue}
            />
          </>
        }

        {/* look around */}
        {section === 3 &&
          <PanelPrompt text={getLookAroundText()} />
        }

        {/* show clue */}
        {section === 4 && // todo audio player
          <PanelPrompt text={'CLUE'} />
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
              wait={5}
              andThen={handleContinue}
            />
          </>
        }

        {/* show full photo */}
        {section === 7 &&
          <>
            <PanelPrompt text={'PHOTO'} />
            <WaitThen
              wait={5}
              andThen={handleContinue}
            />
          </>
        }

        {/* play audio */}
        {section === 8 &&
          <AudioPlayer
            text={'A message to you before you start...'}
            src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
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
