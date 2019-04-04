import * as React from 'react';

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
  height: 30%;
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
  width: 80%;
  transition: padding ease 0.4s;
  padding: 10%;
  &:hover {
    /* width: 80%; */
    padding: 0%;
  }
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
      <GiftImg>
        <SvgGift colour='black' />
      </GiftImg>
      <GiftTitle>
        <TextResize textSize={30}>{gift.senderName}</TextResize>
      </GiftTitle>
      <GiftStatus>
        <TextResize textSize={20}>New Today</TextResize>
      </GiftStatus>
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
