import * as React from 'react';
import { Link } from 'react-router-dom';

import { Gift } from '../domain';
import styled from 'styled-components';
import SvgGift from './svg/gift';
import { global } from '../themes/global';
import { TextResize } from './text-resize';
import { GiftId } from '../domain';
import { track, viewGiftClickedEvent } from '../utils/events';

interface Props {
  gifts: Gift[];
}

const GiftList = styled.div`
  position: relative;
  width: 100%;
  padding: 3vh 0 2vh 0;
`;

const StyledGift = styled.div`
  width: 33%;
  height: 1rem;
  display: inline-block;
  text-align: center;
  cursor: pointer;
`;

const GiftImg = styled.div`
  margin: 5% auto 0;
  width: 70%;
`;

const GiftTitle = styled.div`
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  margin-bottom: 0.5vh;
`;

const GiftStatus = styled(TextResize)`
  font-family: ${global.fonts.title.family};
  font-style: italic
`;

const GiftFrom = styled(TextResize)`
  margin-bottom: 2%;
`;

const SenderName = styled(TextResize)`
  margin-bottom: 4%;
`;

const GiftPile: React.FC<Props> = ({ gifts }: Props) => {

  function giftClick( giftId: GiftId ): void {
    track(viewGiftClickedEvent( {giftId} ));
  }

  const giftList = gifts.map((gift, index) => (
    <StyledGift key={index}>
      <Link to={gift.id} onClick={() => {giftClick(gift.id); }}>
        <GiftImg>
          <SvgGift colour='black' />
        </GiftImg>
        <GiftTitle>
          <GiftFrom textSize={30}>from</GiftFrom>
          <SenderName textSize={30}>{gift.senderName}</SenderName>
        </GiftTitle>
        <GiftStatus textSize={30}>New</GiftStatus>
      </Link>
    </StyledGift>
  ));

  return (
    <GiftList>
      {giftList}
    </GiftList>
  );
};

export {
  GiftPile,
};
