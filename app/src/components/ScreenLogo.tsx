import React from 'react';
import styled from 'styled-components';

const StyledScreenLogo = styled.div`
  text-align: center;
  img {
    max-width: 150px;
  }
`;

export default class ScreenLogo extends React.PureComponent {
  public render() {
    return (
      <StyledScreenLogo>
        <img src={require('../assets/svg/gift.svg')} />
      </StyledScreenLogo>
    );
  }
}
