import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';
import { ProgressBar } from '../components/progress-bar';

interface Props {
  text: string;
  colour: 'white' | 'light-grey';
  percent: number;
}

const StyledProgressLoader = styled.div<Props>`
  height: 100%;
  height: 100vh;
  max-width: 90%;
  margin: 0 auto;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${(props) => props.colour === 'white' && `
    color: ${global.colour.whiteText};
  `}
  ${(props) => props.colour === 'light-grey' && `
    color: ${global.colour.lightGrey};
  `}
`;

const ProgressTitle = styled.div`
  font-size: 200%;
  text-align: center;
`;


const GiftIcon = styled.img`
  max-width: 30%;
`;

const ProgressLoader: React.FC<Props> = (props) => {

  const icon = require('../assets/svg/gift.svg');

  const theme = props.colour === 'white' ? 'white-on-black' : 'grey-on-black';

  return (
    <StyledProgressLoader {...props}>
      <GiftIcon src={icon} />
      <ProgressTitle>{props.text}</ProgressTitle>
      <ProgressBar percent={props.percent} theme={theme} height={'10px'} />
      <ProgressTitle>{props.percent}%</ProgressTitle>
    </StyledProgressLoader>
  );

};

export {
  ProgressLoader,
};
