import React from 'react';
import styled from 'styled-components';

import { events } from '../../services';
import { hShowMuseumGiftPressedEvent, hCreateOwnPressedEvent } from '../../event-definitions';

import { config } from '../../config';
import { setHasUnopenedMuseumGift } from '../../utils/local';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelText } from '../panel-text';
import { PanelButtons } from '../panel-buttons';
import { ButtonLink  } from '../buttons';
import SvgGift from '../svg/gift';

/**
 * Component that informs the user they have a new gift, and asks if they want to open it
 */

const GiftImg = styled.div`
  margin-bottom: 1vh;
  width: 40%;
  position: relative;
`;

interface Props {
  museumName: string;
}

const HomeNewGift: React.FC<Props> = ({ museumName }) => {

  function handleOpenGift() {
    events.track(hShowMuseumGiftPressedEvent());

    // Set that the museum gift is read
    setHasUnopenedMuseumGift(false);
  }

  function handleCreateYourOwn() {
    events.track(hCreateOwnPressedEvent());
  }


  return (
    <Panel>

      <PanelContent topPosition='top-quarter'>
        <PanelPrompt
          textColor='black'
          textSize={70}
          background='solid-white'
        >

          <GiftImg>
            <SvgGift colour='black' />
          </GiftImg>

          <PanelText textSize={60}>You’ve got a gift from {museumName}</PanelText>

        </PanelPrompt>
      </PanelContent>

      <PanelButtons>
        <ButtonLink
          onClick={handleOpenGift}
          to={`/gift/${config.curatedMuseumGiftId}`}
        >
          Show gift
        </ButtonLink>

        <ButtonLink
          onClick={handleCreateYourOwn}
          to='/create-gift'
        >
          Create my own
        </ButtonLink>
      </PanelButtons>

    </Panel>
  );

};

export {
  HomeNewGift,
};
