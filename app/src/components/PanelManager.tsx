import React from 'react'
import styled from 'styled-components/macro';

import Panel from './Panel';

/**
 * Manages panels
 */
const StyledPanelManager = styled.div`
  border: 1px solid orange;
`

interface PanelManagerProps {
};

interface PanelManagerState {
  activePanel: Panel,
};

export default class PanelManager extends React.PureComponent<PanelManagerProps, PanelManagerState> {

  handleClick = () => {
    console.log('The wrapper was clicked.');
  }

  render() {
    return (
      <StyledPanelManager>
        {this.props.children}
      </StyledPanelManager>
    )
  }
}