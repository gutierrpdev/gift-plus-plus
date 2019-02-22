import React from 'react';
import styled from 'styled-components';

import { GiftPart } from '../../domain';
import { global, romanFromDecimal } from '../../themes/global';
import { GiftPartsManager } from './gift-parts-manager';
import { PanelManager } from '../panel-manager';
import { Panel, PanelContent } from '../panel';
// import { Button, Buttons } from '../buttons';
// import { ReceivingPart1 } from './receiving-part-1';
// import { ReceivingPart2 } from './receiving-part-2';
// import { ReceivingPart3 } from './receiving-part-3';
import { ReceivingIntroContent } from '../receiving/intro-content';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../audio-player';
import { PanelPrompt } from '../panel-prompt';


import { ReceivingChooseLocation } from '../receiving/choose-location';

// Gift Part Title
const GiftPartTitle = styled.div<Props>`
  text-align: center;
  font-family: ${global.fonts.title.family};
  color: white;
  display: flex;
  margin: 0 auto;
  font-weight: ${global.fonts.title.bold};
  line-height: 1;


  // Idle
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle && `
    font-size: 10vw;
  `}

  // Idle first
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle &&
    props.index === 0 && `
    position: relative;
    font-size: 10vw;
    &:before {
      content: 'Open';
      position: absolute;
      top: -4vh;
      text-align: center;
      width: 100%;
      left: auto;
      font-size: 4vw;
      font-family: ${global.fonts.body.family};
      text-transform: uppercase;
    }
    &:after {
      content: '';
      background-image: url( ${require('../../assets/svg/down-chev-white.svg')} );
      background-size: cover;
      width: 10vw;
      height: 8vw;
      position: absolute;
      bottom: -6vh;
      left: 50%;
      transform: translate(-50%, 0);
    }
  `}

  // Idle not first
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle &&
    props.index > 0 && `
    color: black;
  `}

  // Open
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Open && `
    font-size: 6vw;
    margin: 20px auto;
  `}

  // Closed
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Closed && `
    font-size: 5vw;
  `}

`;

/**
 * Visual wrapper for a gift part
 * Handles displaying its contents
 */
export enum GiftPartWrapperStatus {Idle, Open, Closed}

export interface Props {
  giftPartManager: GiftPartsManager;
  giftPart: GiftPart;
  index: number;
  status: GiftPartWrapperStatus;
  onClick?: (giftPartWrapper: any) => void;
}

const StyledGiftPart = styled.div<Props>`
  // Common
  background-image: url(${(props) => props.giftPart && props.giftPart.photo ? props.giftPart.photo : ''});
  background-position: center;
  background-size: cover;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  overflow: hidden;

  // Idle
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Idle && `
    justify-content: center;
  `}

  // Open
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Open && `
    flex-grow: 1;
  `}

  // Closed
  ${(props: Props) =>
    props.status === GiftPartWrapperStatus.Closed && `
    flex-grow: 0;
    justify-content: center;
    min-height: 10vw;
  `}

`;

class GiftPartWrapper extends React.PureComponent<Props, {}> {

  // Our panel manager determines which panel in our stack to show
  public panelManager: PanelManager | null = null;
  // public managerRef: any = React.createRef();

  // Inform the wrapper, todo this should be handled by the parent on click
  public handleClick = () => {
    this.props.giftPartManager.setActiveGiftPartWrapper(this);
  }

  public nextPanel = () => {
    if (this.panelManager) {
      this.panelManager.nextPanel();
    }
  }

  // Load the content for the gift part
  public getGiftPartContent = () => {

    // console.log('get');

    // console.log(this.props.index);
    // return (
    //   <Panel>
    //     <PanelContent>
    //       <p>12</p>
    //     </PanelContent>
    //     <Buttons>
    //       <Button onClick={this.nextPanel}>Skip</Button>
    //       <Button onClick={this.nextPanel}>OK</Button>
    //     </Buttons>
    //   </Panel>
    // );

    // console.log(this.panelManager);

    return (
      <>
      <ReceivingChooseLocation {...this.props} panelManager={this.panelManager} />
      <ReceivingIntroContent {...this.props}  />
      </>
    );


    // switch (this.props.index) {
    //   case 0 :
    //     return (
    //     <>
    //     <ReceivingPart1>1</ReceivingPart1>
    //     </>
    //     );
    //   case 1 :
    //     return <ReceivingPart2 />;
    //   case 2 :
    //     return <ReceivingPart3 />;
    //   default :
    //     return null;
    // }
  }

  public renderPanels() {

    const show = this.props.status === GiftPartWrapperStatus.Open;

    if (show) {

      return (
        <PanelManager
          ref={(ref) => { this.panelManager = ref; }}
        >

          {/* todo buttons if already player */}
          {/* todo correct audio */}
          <Panel>
            <PanelContent>
              <AudioPlayer
                  text={'A message to you before you start...'}
                  src={require('../../assets/audio/_1-second-of-silence.mp3')}
              />
            </PanelContent>
            <Buttons>
              <Button onClick={this.nextPanel}>Skip</Button>
              <Button onClick={this.nextPanel}>OK</Button>
            </Buttons>
          </Panel>

          <Panel>
            <PanelContent>
              <PanelPrompt text={'lorem ipsum'} />
            </PanelContent>
            <Buttons>
              <Button>Show Clue</Button>
              <Button onClick={this.nextPanel}>OK</Button>
            </Buttons>
          </Panel>

          <Panel>
            <PanelContent>
              <PanelPrompt text={'Great, thanks'} />
            </PanelContent>
            <Buttons>
              <Button onClick={this.nextPanel}>OK</Button>
            </Buttons>
          </Panel>

        </PanelManager>
      );

    } else {
      return '';
    }


    // if (show) {

    //   return (
    //     <PanelManager
    //       ref={(ref) => { this.panelManager = ref; console.log('set'); }}
    //       // ref={this.managerRef}
    //     >
    //     {this.getGiftPartContent()}
    //     </PanelManager>
    //   );

    // } else {
    //   return '';
    // }
  }

  public render() {
    return (
      <StyledGiftPart {...this.props} onClick={this.handleClick}>

        <GiftPartTitle {...this.props}>Part {romanFromDecimal(this.props.index + 1)}</GiftPartTitle>
        {this.renderPanels()}

      </StyledGiftPart>
    );
  }
}

export {
  GiftPartWrapper,
};
