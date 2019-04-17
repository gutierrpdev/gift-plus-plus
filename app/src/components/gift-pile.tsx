import * as React from 'react';
import { Link } from 'react-router-dom';

import { Gift } from '../domain';
import styled from 'styled-components';
import SvgGift from './svg/gift';
import { global } from '../themes/global';
import { TextResize } from './text-resize';

interface Props {
  gifts: Gift[];
}

const GiftList = styled.div`
  position: relative;
  width: 100%;
  padding: 2vh 0 2vh 0;
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

const GiftStatus = styled.div`
  font-family: ${global.fonts.title.family};
  font-style: italic
`;

const GiftPile: React.FC<Props> = ({ gifts }: Props) => {

  const giftList = gifts.map((gift, index) => (
    <StyledGift key={index}>
      <Link to={gift.id}>
        <GiftImg>
          <SvgGift colour='black' />
        </GiftImg>
        <GiftTitle>
          <TextResize textSize={30}>{gift.senderName}</TextResize>
        </GiftTitle>
        <GiftStatus>
          <TextResize textSize={20}>New Today</TextResize>
        </GiftStatus>
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
