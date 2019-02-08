import React from 'react'
import styled from 'styled-components/macro';
import GiftPartWrapper from './GiftPartWrapper';
import { Gift } from '../domain';

/**
 * Holds and manages visual Gift Parts
 * Controls behaviours of the parts when clicked/made active
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
  activeGiftPart: {null: GiftPartWrapper};
};

export default class GiftPartsManager extends React.PureComponent<GiftPartsManagerProps, GiftPartsManagerState> {

  handleClick = () => {
    console.log(this.state);
    console.log('The mamager was clicked.');
  }

  render() {
    // console.log(this.props.gifts);
    this.props.gifts.map(function (gift) {
      return console.log(gift);
    });
    // {this.props.gifts}
    return (
      <StyledGiftPartsManager onClick={this.handleClick}>
        {this.props.children}
      </StyledGiftPartsManager>
    )
  }
}