import React from 'react';
import styled from 'styled-components';
import GiftPartWrapper from './GiftPartWrapper';
import { Gift, GiftPart } from '../domain';
import { GiftPartWrapperStatus } from './GiftPartWrapper';

/**
 * Holds and manages visual Gift Parts
 * Controls behaviours of the parts when clicked/made active
 * Gifts are passed in as an array, e.g. after loading from API
 */

const StyledGiftPartsManager = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

export interface GiftPartsManagerProps {
  gift: Gift;
}

interface GiftPartsManagerState {
  activeGiftPart?: GiftPart;
  giftPartWrappers?: GiftPartWrapper[];
}

export default class GiftPartsManager extends React.PureComponent<GiftPartsManagerProps, GiftPartsManagerState> {

  // public state = {
  //   // activeGiftPart: null,
  //   // giftPartWrappers: [],
  // };

  // todo not sure we need this, should be child?
  // public handleClick = () => {
  //   console.log(this);
  //   // console.log('The manager was clicked.');
  // }

  public setActiveGiftPartWrapper = (active: GiftPartWrapper) => {
    // Record the active gift
    this.setState({
      activeGiftPart: active.props.giftPart,
    })
  }

  // public storeGiftPartWrapper( wrapper: GiftPartWrapper) {
  //   const wrappers = this.state.giftPartWrappers;
  //   // wrappers.push(wrapper);
  //   this.setState({
  //     giftPartWrapper: wrappers;
  //   })
  // }

  public render() {
    console.log('render');
    return (
      <StyledGiftPartsManager>
        {this.props.gift.parts.map((giftPart, index) => {

          console.log({index});

          let status: GiftPartWrapperStatus = GiftPartWrapperStatus.Idle;

          let active: boolean = false;
          if (this.state && this.state.activeGiftPart) {
            console.log({giftPart});
            console.log(this.state.activeGiftPart);
            if (giftPart === this.state.activeGiftPart) {
              status = GiftPartWrapperStatus.Open;
            } else {
              status = GiftPartWrapperStatus.Closed;
            }
          }

          console.log({active});

          return (
            <GiftPartWrapper
              giftPartManager={this}
              key={index}
              giftPart={giftPart}
              index={index}
              status={status}
              //onClick={this.handleClick()}
            />
          )
        }, this)}
      </StyledGiftPartsManager>
    );
  }
}