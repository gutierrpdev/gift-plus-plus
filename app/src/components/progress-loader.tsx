import React from 'react';
import styled from 'styled-components';

import { ProgressBar } from '../components/progress-bar';

const StyledProgressLoader = styled.div`
  height: 100%;
  height: 100vh;
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const ProgressTitle = styled.div`
  font-size: 200%;
  text-align: center;
`;

interface Props {
  text: string;
  percent: number;
}

const ProgressLoader: React.FC<Props> = ({ text, percent }) => {

  return (
    <StyledProgressLoader>
      <ProgressTitle>{text}: {percent}%</ProgressTitle>
      <ProgressBar percentage={percent} theme={'blackOnWhite'} />
    </StyledProgressLoader>
  );

};

export {
  ProgressLoader,
};
