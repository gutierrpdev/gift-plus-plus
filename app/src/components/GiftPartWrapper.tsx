import React from 'react';
import styled from 'styled-components';

/**
 * Visual wrapper for a gift part
 */

const StyledGiftPart = styled.div`
  border: 1px solid blue;
  padding: 20px;
  &.active {
    border:1px solid red;
  }
`;
export default class GiftPartWrapper extends React.Component {

  public state = {
    active: false,
  };

  public handleClick = () => {
    console.log('The wrapper was clicked.');
    this.setState({
      active: true,
    });
  }

  public render() {
    const activeClass: string = (this.state.active ? 'active' : '');
    console.log(activeClass);
    return (
      <StyledGiftPart className={activeClass} onClick={this.handleClick}>
        11
      </StyledGiftPart>
    );
  }
}
