import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { PanelText } from '../panel-text';
import { Buttons, Button  } from '../buttons';
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

      <Buttons>
        <Button><Link to='/create-gift'>Create own gift</Link></Button>

        <Button primary={true}>
          {/* todo: real url */}
          <Link
            onClick={handleOpenGift}
            to='/gift/2e73df73-4faf-5c0a-abaa-c3717fd3ef7c'
          >
            Show gift
          </Link>
        </Button>
      </Buttons>

    </Panel>
  );

};

export {
  HomeNewGift,
};
