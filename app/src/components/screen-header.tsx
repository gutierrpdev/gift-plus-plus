import React from 'react';
import styled from 'styled-components';

import { ScreenTitle } from './screen-title';
import { ScreenSubTitle } from './screen-sub-title';
import { ScreenPostTitle } from './screen-post-title';
import { ScreenLogo } from './screen-logo';

const ScreenHeaderStyle = styled.div<Props>`
  width: 100%;
  padding: 5% 0 5%;
  ${(props) => props.topPadding && `
    padding-top: 10%;
  `}
  ${(props) => props.background === 'white' && `
    background-color: white;
  `}
`;

export type ScreenHeaderSize = 'Small' | 'Big';

interface Props {
  preSubTitle?: string;
  subTitle?: string;
  postSubTitle?: string;
  title?: string;
  postTitle?: string;
  showLogo?: boolean;
  topPadding?: boolean;
  background?: 'none' | 'white';
}

const ScreenHeader: React.FC<Props> = (props: Props) => {

  return (
    <ScreenHeaderStyle {...props}>
      {props.showLogo && <ScreenLogo />}
      {props.preSubTitle && <ScreenPostTitle>{props.preSubTitle}</ScreenPostTitle>}
      {props.subTitle && <ScreenSubTitle>{props.subTitle}</ScreenSubTitle>}
      {props.postSubTitle && <ScreenPostTitle>{props.postSubTitle}</ScreenPostTitle>}

      {/* support line breaks */}
      {props.title && props.title.split('\n').map((item, key) => {
        return <ScreenTitle key={key}>{item}</ScreenTitle>;
      })}

      {props.postTitle && <ScreenPostTitle>{props.postTitle}</ScreenPostTitle>}
    </ScreenHeaderStyle>
  );
};

export {
  ScreenHeader,
};
