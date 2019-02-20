import React from 'react';
import styled from 'styled-components';

import { ScreenTitle } from './screen-title';
import { ScreenSubTitle } from './screen-sub-title';
import { ScreenLogo } from './screen-logo';
import { Gift } from '../domain';

// Header for receiving a gift.  todo : rename to receiving

export enum ScreenHeaderSize {'Small', 'Big'}

const ScreenHeaderStyle = styled.div`
  margin: 5vw 0 8vw;
`;

interface Props {
  gift: Gift;
  title: string;
  size: ScreenHeaderSize;
}

const ScreenHeader: React.FC<Props> = ({ gift, title, size }: Props) => {

  const logoVisible = (size === ScreenHeaderSize.Big);
  const museumNameVisible = (size === ScreenHeaderSize.Big);

  return (
    <ScreenHeaderStyle>
      {logoVisible && <ScreenLogo />}
      <ScreenSubTitle>Your gift from</ScreenSubTitle>
      <ScreenTitle>{gift.senderName}</ScreenTitle>
      {museumNameVisible && <ScreenSubTitle>{title}</ScreenSubTitle>}
    </ScreenHeaderStyle>
  );
};

export {
  ScreenHeader,
};
