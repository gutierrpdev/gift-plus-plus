import React from 'react';
import styled from 'styled-components';

const StyledScreenLogo = styled.div`
  text-align: center;
  margin: 0 0 2vw;
  img {
    max-width: 25%;
  }
`;

const ScreenLogo: React.FC = () => (
  <StyledScreenLogo>
    <img src={require('../assets/svg/gift-black.svg')} />
  </StyledScreenLogo>
);

export {
  ScreenLogo,
};
