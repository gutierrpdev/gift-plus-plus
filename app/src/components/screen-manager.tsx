import React from 'react';
import styled from 'styled-components';

// Arranges the elements on the screen, using flex
const ScreenManagerStyle = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const ScreenManager: React.FC = (props) => {
  return (
    <ScreenManagerStyle>
      {props.children}
    </ScreenManagerStyle>
  );
};

export {
  ScreenManager,
};
