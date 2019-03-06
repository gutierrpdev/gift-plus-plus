import React from 'react';
import styled from 'styled-components';

const StyledScreenLogo = styled.div`
  text-align: center;
  margin: 0 0 2vw;
  img {
    max-width: 27vw;
  }
`;

const ScreenLogo: React.FC = () => (
  <StyledScreenLogo>
    <img src={require('../assets/svg/gift.svg')} />
  </StyledScreenLogo>
);

export {
  ScreenLogo,
};
