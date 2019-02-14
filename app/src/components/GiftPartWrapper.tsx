import React from 'react';
import styled from 'styled-components';

import { GiftPart } from '../domain';
import { global } from '../themes/global';
import GiftPartsManager from './GiftPartsManager';
import PanelManager from '../components/PanelManager';
import Panel from '../components/Panel';
import PanelPrompt from '../components/PanelPrompt';
import { Buttons, Button } from '../components/Button';

// Gift Part Title
const GiftPartTitle = styled.div`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  font-size: '1em';
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

/**
 * Visual wrapper for a gift part
 */
export enum GiftPartWrapperStatus {Idle, Open, Closed}

export interface Props {
  giftPartManager: GiftPartsManager;
  giftPart: GiftPart;
  index: number;
  status: GiftPartWrapperStatus;
  onClick?: (giftPartWrapper: any) => void;
}

interface State {
}

const StyledGiftPart = styled.div<Props>`
  background-image: url(${(props) => props.giftPart && props.giftPart.photo ? props.giftPart.photo : ''});
  background-position: center;
  background-size: cover;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: ${(props) => props.status && (props.status === GiftPartWrapperStatus.Open) ? '1' :
  (props.status === GiftPartWrapperStatus.Idle) ? '' : '0'};
  height: ${(props) => props.status && (props.status === GiftPartWrapperStatus.Closed) ? '40px' : ''};
`;

export default class GiftPartWrapper extends React.Component<Props, State> {

  // Inform the wrapper, todo this should be handled by the parent on click
  public handleClick = () => {
    this.props.giftPartManager.setActiveGiftPartWrapper(this);
  }

  public renderPanels() {
    const show = this.props.status === GiftPartWrapperStatus.Open;

    if (show) {
      return (
        <PanelManager>
          <Panel>
            <PanelPrompt text={'lorem ipsum'} />
            <Buttons>
              <Button>Show Clue</Button>
              <Button>OK</Button>
            </Buttons>
          </Panel>
        </PanelManager>
      );
    } else {
      return '';
    }
  }

  public render() {
    return (
      <StyledGiftPart {...this.props} onClick={this.handleClick}>

        <GiftPartTitle>Part {this.props.index + 1}</GiftPartTitle>

        {this.renderPanels()}

      </StyledGiftPart>
    );
  }
}
