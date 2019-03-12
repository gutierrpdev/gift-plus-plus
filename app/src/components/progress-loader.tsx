import React from 'react';
import styled from 'styled-components';

import { ProgressBar } from '../components/progress-bar';

const StyledProgressBar = styled.div`
  max-width: 90%;
  overflow: hidden;
`;

const ProgressTitle = styled.div`
  font-size: 200%;
  text-align: center;
`;

interface Props {
  percentage: number;
}

const ProgressLoader: React.FC<Props> = (props) => {

  return (
    <StyledProgressBar>
      <ProgressTitle>Loading: {props.percentage}%</ProgressTitle>
      <ProgressBar percentage={props.percentage} theme={'blackOnWhite'} />
    </StyledProgressBar>
  );

};

export {
  ProgressLoader,
};
