import React from 'react';
import styled from 'styled-components';

import { Gift } from '../domain';
import GiftPartsManager from './GiftPartsManager';

/**
 * Visual wrapper for a gift part
 */

const GiftPartTitle = styled.div`
border: 1px solid orange;
`;

const StyledGiftPart = styled.div`
  border: 1px solid blue;
  padding: 20px;
  &.active {
    border:1px solid red;
  }
`;

export interface GiftPartWrapperProps {
  giftPartManager: GiftPartsManager;
  gift: Gift;
  index: number;
  active: boolean;
  onClick?: (giftPartWrapper: any)=>void;
}

interface GiftPartWrapperState {
  active: boolean;
}

export default class GiftPartWrapper extends React.Component<GiftPartWrapperProps, GiftPartWrapperState> {

  public state = {
    active : this.props.active,
  };

  // todo : do we need this?
  public handleClick = () => {
    console.log('The wrapper was clicked.');
    // console.log(this);
    this.props.giftPartManager.setActiveGiftPartWrapper(this);
    this.setState({
      active: true,
    });
  }

  public render() {
    console.log(this.state);
    const activeClass: string = (this.state.active ? 'active' : '');
    // console.log(activeClass);
    return (
      <StyledGiftPart className={activeClass} onClick={this.handleClick}>
        <GiftPartTitle>Part {this.props.index + 1}</GiftPartTitle>
      </StyledGiftPart>
    );
  }
}
