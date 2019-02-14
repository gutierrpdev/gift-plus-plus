import React from 'react';
import styled from 'styled-components';

// Load the svg
const Logo = require("../assets/svg/gift.svg") as string;

const StyledScreenLogo = styled.div`
  text-align: center;
  img {
    max-width: 150px;
  }
`;

export default class ScreenLogo extends React.PureComponent {
  render() {
    return (
      <StyledScreenLogo>
        <img src={Logo} />
      </StyledScreenLogo>
    )
  }
}