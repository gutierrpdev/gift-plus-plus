import React from 'react';
import styled from 'styled-components';

import Panel from './Panel';

/**
 * Manages panels
 */
const StyledPanelManager = styled.div<PanelManagerProps>`
  width: 100%;
`;

interface PanelManagerProps {
}

interface PanelManagerState {
  // activePanel: Panel;
  activePanelIndex: number;
}

export default class PanelManager extends React.PureComponent<PanelManagerProps, PanelManagerState> {

  public state = {
    activePanelIndex: 0,
  };

  // Go to the next panel in the list
  public nextPanel = () => {

    // Get the next index, but don't exceed the panels count
    const nextIndex = Math.min(this.state.activePanelIndex + 1, React.Children.count(this.props.children));

    this.setState({
      activePanelIndex: nextIndex,
    });

  }

  // Render the child panels based on some management done by this manager
  public renderChildren() {

    // Return each child panel
    return React.Children.map(this.props.children, (child, index) => {
      const panel: Panel = child as Panel;

      // Set visibility based on the current panel
      const visible = this.state.activePanelIndex === index;

      return (
        <Panel {...panel.props} visible={visible} />
      );
    });
  }

  public render() {
    return (
      <StyledPanelManager>
        {this.renderChildren()}
      </StyledPanelManager>
    );
  }
}
