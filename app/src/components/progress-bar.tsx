import React from 'react';
import styled from 'styled-components';

const ProgressBarInner = styled.div<Props>`
  background-color: white;
  width: ${(props) => props.percentage}%;
  height: 100%;
  position: relative;
  border-radius: 10vmin;
  &:after {
    content: '';
    height: 6vmin;
    width: 1vmin;
    background-color: white;
    position: absolute;
    top: -2.5vmin;
    right: 0;
    border-radius: 10vmin;
  }
`;

const StyledProgressBar = styled.div`
  background-color: black;
  height: 1.2vw;
  width: 100%;
  border-radius: 10vmin;
  /* overflow: hidden; */
  margin: 8% 0;
`;

interface Props {
  percentage: number;
}

const ProgressBar: React.FC<Props> = (props) => (
  <StyledProgressBar>
    <ProgressBarInner {...props} />
  </StyledProgressBar>
);

export {
  ProgressBar,
};
