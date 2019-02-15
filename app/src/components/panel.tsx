import React from 'react';
import styled from 'styled-components';

import { PanelManager } from './panel-manager';

const StyledPanel = styled.div<Props>`
  display: ${(props) => props.visible === false ? 'none' : 'block'};
  overflow: hidden;
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
};
