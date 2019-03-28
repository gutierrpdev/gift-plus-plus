import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';

const ProgressBarInner = styled.div<Props>`
  width: ${(props) => props.percent}%;
  height: 100%;
  position: relative;
  border-radius: 10vmin;

  ${(props) => props.theme === 'white-on-black' && `
    background-color: white;
  `}
  ${(props) => props.theme === 'black-on-white' && `
    background-color: black;
  `}
  ${(props) => props.theme === 'grey-on-black' && `
    background-color: ${global.colour.lightGrey};
  `}

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
  background-color: ${(props) => props.theme === 'black-on-white' ? 'white' : 'black'};
  height: ${(props) => props.height};
  width: 100%;
  border-radius: 10vmin;
  /* overflow: hidden; */ /* this causes the progress bar to be hidden */
  margin: 3% 0;
`;

interface Props {
  percent: number;
  height: string; // e.g. '3%' or '10px'
  theme: 'white-on-black' | 'black-on-white' | 'grey-on-black';
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
