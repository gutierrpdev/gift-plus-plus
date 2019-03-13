import React from 'react';
import styled from 'styled-components';

import { BackgroundImage } from './background-image';

// Arranges the elements on the screen, using flex
const ScreenManagerStyle = styled.div`
  height: 100%;
  width: 100%;
  /* max-width: 100%; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

interface Props {
  backgroundImageUrl?: string;
}

const ScreenManager: React.FC<Props> = (props) => {
  return (
    <ScreenManagerStyle>
      <BackgroundImage backgroundImageUrl={props.backgroundImageUrl} >
        {props.children}
      </BackgroundImage>
    </ScreenManagerStyle>
  );
};

export {
  ScreenManager,
};
