import React from 'react';
import styled from 'styled-components';
import GiftPartWrapper from './GiftPartWrapper';
import { Gift } from '../domain';

/**
 * Holds and manages visual Gift Parts
 * Controls behaviours of the parts when clicked/made active
 * Gifts are passed in as an array, e.g. after loading from API
 */

const StyledGiftPartsManager = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
`;

export interface GiftPartsManagerProps {
  gifts: Gift[];
}

interface GiftPartsManagerState {
  activeGiftPart?: GiftPartWrapper;
}

export default class GiftPartsManager extends React.PureComponent<GiftPartsManagerProps, GiftPartsManagerState> {

  // todo not sure we need this, should be child?
  // public handleClick = (giftPartWrapper: GiftPartWrapper) => {
  //   console.log(this);
  //   console.log('The manager was clicked.');
  // }

  public setActiveGiftPartWrapper = (active: GiftPartWrapper) => {
    // console.log(active);
    // Record the active gift
    this.setState({
      activeGiftPart: active,
    })
  }

  public render() {
    console.log('render');
    return (
      <StyledGiftPartsManager>
        {this.props.gifts.map((gift, index) => {

          console.log({index});

          let active: boolean = false;
          if (this.state && this.state.activeGiftPart) {
            active = (gift === this.state.activeGiftPart.props.gift);
          }

          console.log({active});

          return (
            <GiftPartWrapper
              giftPartManager={this}
              key={index}
              gift={gift}
              index={index}
              active={false}
              // onClick={this.handleClick(ref)}
            />
          )
        }, this)}
      </StyledGiftPartsManager>
    );
  }
}