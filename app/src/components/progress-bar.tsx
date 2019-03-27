import React from 'react';
import styled from 'styled-components';

const ProgressBarInner = styled.div<Props>`
  background-color: ${(props) => props.theme === 'whiteOnBlack' ? 'white' : 'black'};
  width: ${(props) => props.percentage}%;
  height: 100%;
  position: relative;
  // border-radius: 10vmin;

  // Optional progress bar
  ${(props) => props.showPositionBar && `
    &:after {
      content: '';
      height: 6vmin;
      width: 1vmin;
      background-color: white;
      position: absolute;
      top: -2.5vmin;
      right: -0.5vw;
      border-radius: 10vmin;
    }
  `}

`;

const StyledProgressBar = styled.div<Props>`
  background-color: ${(props) => props.theme === 'whiteOnBlack' ? 'black' : 'white'};
  height: 3%;
  width: 100%;
  /* border-radius: 10vmin; */
  /* overflow: hidden; */
  margin: 8% 0;
`;

interface Props {
  percentage: number;
  theme: 'whiteOnBlack' | 'blackOnWhite';
  showPositionBar?: boolean;
  // onSeek: (e: MouseEvent) => void; // todo hook up seek
}

const ProgressBar: React.FC<Props> = (props) => {

  // function handleSeek(e: MouseEvent) {
  //   console.log(e);
  // }

  return (
    <StyledProgressBar {...props}>
      <ProgressBarInner {...props} />
    </StyledProgressBar>
  );

};

export {
  ProgressBar,
};
