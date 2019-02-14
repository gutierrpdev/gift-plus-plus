import React, { isValidElement } from 'react';
import styled from 'styled-components';

import { Gift, GiftPart } from '../domain';
import { global } from '../themes/global';
import GiftPartsManager from './GiftPartsManager';
import PanelManager from '../components/PanelManager';
import PanelTitle from '../components/PanelTitle';
import PanelPrompt from '../components/PanelPrompt';
import Panel from '../components/Panel';
// import { Buttons, Button } from '../components/Button';

// Gift Part Title
const GiftPartTitle = styled.div`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  font-size: '1em';
  display: flex;
  flex: 1;
  /* flex-direction: row; */
  align-items: center;
  justify-content: center;
`;

/**
 * Visual wrapper for a gift part
 */
export enum GiftPartWrapperStatus {Idle, Open, Closed};

export interface Props {
  giftPartManager: GiftPartsManager;
  giftPart: GiftPart;
  index: number;
  status: GiftPartWrapperStatus;
  onClick?: (giftPartWrapper: any)=>void;
}

interface State {
}

const StyledGiftPart = styled.div<Props>`
  background-image: url(${props => props.giftPart && props.giftPart.photo ? props.giftPart.photo : ''});
  background-position: center;
  background-size: cover;
  // height: 100%;
  // width: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  flex-grow: ${props => props.status && (props.status == GiftPartWrapperStatus.Open) ? '1' :
  (props.status == GiftPartWrapperStatus.Idle) ? '' : '0'};
  height: ${props => props.status && (props.status = GiftPartWrapperStatus.Closed) ? '40px' : ''};
`;

export default class GiftPartWrapper extends React.Component<Props, State> {

  // public state = {
  //   status : GiftPartWrapperStatus.Idle,
  // };

  // todo : do we need this?
  public handleClick = () => {
    console.log('The wrapper was clicked.');
    // console.log(this);
    this.props.giftPartManager.setActiveGiftPartWrapper(this);
    // this.setState({
    //   status : GiftPartWrapperStatus.Open,
    // });
  }

  public render() {
    // console.log(this.state);
    // const activeClass: string = (this.state.active ? 'active' : '');
    // console.log(activeClass);
    return (
      <StyledGiftPart {...this.props} onClick={this.handleClick}>

      {/* [{this.props.status}] */}

        <GiftPartTitle>Part {this.props.index + 1}</GiftPartTitle>

        <PanelManager>

          {/* <Panel>
            <PanelPrompt text={'lorem ipsum'} />
            <Buttons>
              <Button>Show Clue</Button>
              <Button>OK</Button>
            </Buttons>
          </Panel> */}

        </PanelManager>

      </StyledGiftPart>
    );
  }
}
