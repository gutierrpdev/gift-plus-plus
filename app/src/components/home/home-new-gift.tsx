import React from 'react';
import styled from 'styled-components';

import { config } from '../../config';
import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelText } from '../panel-text';
import { PanelButtons } from '../panel-buttons';
import { ButtonLink  } from '../buttons';
import {
  setHasUnopenedMuseumGift,
} from '../../utils/local';
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
    // Set that the museum gift is read
    setHasUnopenedMuseumGift(false);
  }

  return (
    <Panel>

      <PanelContent>
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
        <ButtonLink to='/create-gift'>Create your own</ButtonLink>
      </PanelButtons>

    </Panel>
  );

};

export {
  HomeNewGift,
};
