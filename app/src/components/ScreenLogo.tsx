import React from 'react';
import styled from 'styled-components';

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
        <img src="https://gift.itu.dk/wp-content/uploads/sites/24/2016/12/cropped-GIFT-Logo-large.png" />
      </StyledScreenLogo>
    )
  }
}