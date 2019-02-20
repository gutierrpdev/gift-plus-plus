import React from 'react';
import styled from 'styled-components';

import { PanelManager } from './panel-manager';

// Content part of the panel, with audio player, text, but not buttons
const PanelContent = styled.div`
  flex-grow: 1;
  align-items: center;
  display: flex;
`;

const StyledPanel = styled.div<Props>`
  display: ${(props) => props.visible === false ? 'none' : 'flex'};
  flex-direction: column;
  overflow: hidden;
  height: 100%;
  width: 100%;
`;

export interface Props {
  panelManager?: PanelManager;
  visible?: boolean;
}

class Panel extends React.PureComponent<Props, {}> {

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

export {
  Panel,
  PanelContent,
};
