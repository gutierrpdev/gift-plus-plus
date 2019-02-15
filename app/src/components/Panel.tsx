import React from 'react';
import styled from 'styled-components';

import PanelManager from './PanelManager';

const StyledPanel = styled.div<Props>`
  display: ${(props) => props.visible === false ? 'none' : 'block'};
  overflow: hidden;
  /* height: 100vh; */
  /* padding: 5vw 5vw; */
  /* display: flex;
  flex-direction: column;
  justify-content: center; */
  /* margin: 0 auto; */
  /* text-align: center; */
`;

export interface Props {
  panelManager?: PanelManager;
  visible?: boolean;
}

export interface PanelState {
}

export default class Panel extends React.PureComponent<Props, PanelState> {

  public static defaultProps = {
    visible: true,
  };

  public panelManager?: PanelManager = this.props.panelManager;
  // panelManager?: PanelManager;

  // Go to the next panel
  public nextPanel() {
    // Inform the panel managee to go to the next panel
  }

  // setManager = (panelManager:PanelManager) => {
  //   this.panelManager = panelManager;
  // }

  public render() {
    return (
      <StyledPanel {...this.props}>{this.props.children}</StyledPanel>
    );
  }
}
