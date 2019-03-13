import React from 'react';
import styled from 'styled-components';

interface Props {
  backgroundImageUrl?: string;
}

// Arranges the elements on the screen, using flex
const ScreenManagerStyle = styled.div<Props>`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  background-image: url(${(props) => props.backgroundImageUrl ? props.backgroundImageUrl : ''});
  background-position: center;
  background-size: cover;
`;

interface Props {
  backgroundImageUrl?: string;
}

const ScreenManager: React.FC<Props> = (props) => {
  return (

    <ScreenManagerStyle {...props}>
      {props.children}
    </ScreenManagerStyle>

  );
};

export {
  ScreenManager,
};
