import React from 'react';
import styled from 'styled-components';

import { ScreenTitle } from './screen-title';
import { ScreenSubTitle } from './screen-sub-title';
import {  ScreenPostTitle } from './screen-post-title';
import { ScreenLogo } from './screen-logo';

const ScreenHeaderStyle = styled.div<Props>`
  margin: 5% 0 5%;
  ${(props) => props.topPadding && `
    padding-top: 10%;
  `}
`;

export type ScreenHeaderSize = 'Small' | 'Big';

interface Props {
  subTitle?: string;
  postSubTitle?: string;
  title?: string;
  postTitle?: string;
  showLogo?: boolean;
  topPadding?: boolean;
}

const ScreenHeader: React.FC<Props> = (props: Props) => {

  return (
    <ScreenHeaderStyle {...props}>
      {props.showLogo && <ScreenLogo />}
      {props.subTitle && <ScreenSubTitle>{props.subTitle}</ScreenSubTitle>}
      {props.postSubTitle && <ScreenPostTitle>{props.postSubTitle}</ScreenPostTitle>}
      {props.title && <ScreenTitle>{props.title}</ScreenTitle>}
      {props.postTitle && <ScreenPostTitle>{props.postTitle}</ScreenPostTitle>}
    </ScreenHeaderStyle>
  );
};

export {
  ScreenHeader,
};
