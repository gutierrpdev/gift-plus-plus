import React from 'react';
import styled from 'styled-components';

import { PanelManager } from './panel-manager';

// Content part of the panel, with audio player, text, but not buttons
const PanelContent = styled.div`
  flex-grow: 1;
  align-items: center;
  display: flex;
`;

const StyledPanel = styled.div<PanelProps>`
  display: ${(props) => props.visible === false ? 'none' : 'flex'};
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export interface PanelProps {
  panelManager?: PanelManager | null;
  visible?: boolean;
}

class Panel extends React.PureComponent<PanelProps, {}> {

  public static defaultProps = {
    visible: true,
  };

  public panelManager?: PanelManager | null = this.props.panelManager;
  // panelManager?: PanelManager;

  // Go to the next panel
  public nextPanel() {
    // console.log('next');
    if (this.panelManager) {
      // Inform the panel managee to go to the next panel
      this.panelManager.nextPanel();
    }
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

export {
  Panel,
  PanelContent,
};
