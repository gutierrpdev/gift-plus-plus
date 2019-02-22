import React from 'react';
import styled from 'styled-components';

import { Panel } from './panel';

/**
 * Manages panels
 */
const StyledPanelManager = styled.div`
  width: 100%;
  height: 100%;
`;

interface State {
  activePanelIndex: number;
}

class PanelManager extends React.PureComponent<{}, State> {

  public state = {
    activePanelIndex: 0,
  };

  // Go to the next panel in the list
  public nextPanel = () => {

    // console.log(this.activePanelIndex);

    // Get the next index, but don't exceed the panels count
    const nextIndex = Math.min(this.state.activePanelIndex + 1, React.Children.count(this.props.children));

    // console.log({nextIndex});

    this.setState({
      activePanelIndex: nextIndex,
    });

  }

  // Render the child panels based on some management done by this manager
  public renderChildren() {

    // Return each child panel
    return React.Children.map(this.props.children, (child, index) => {

    // console.log({child1});
      const panel: Panel = child as Panel;

      // Set visibility based on the current panel
      const visible = this.state.activePanelIndex === index;
      // console.log(index);
      // console.log(this.state.activePanelIndex);
      // console.log(visible);
      // console.log({...panel.props});

      return (
        <Panel {...panel.props} visible={visible} key={index} />
      );
    });

    // // Return each child panel
    // return React.Children.map(this.props.children, (child1, index1) => {
    //   console.log({child1});
    //   return React.Children.map(child1.props.children, (child, index) => {
    //     console.log(React.Children.count(child1.props.children));
    //     // console.log({index});
    //     console.log({child});
    //     const panel: Panel = child as Panel;

    //     // Set visibility based on the current panel
    //     const visible = this.state.activePanelIndex === index;
    //     // console.log(index);
    //     // console.log(this.state.activePanelIndex);
    //     // console.log(visible);
    //     // console.log({...panel.props});

    //     return child;
    //     return (
    //       <Panel {...panel.props} visible={visible} key={index} />
    //     );
    //   });
    // });
  }

  public render() {
    return (
      <StyledPanelManager>
        {this.renderChildren()}
      </StyledPanelManager>
    );
  }
}

export {
  PanelManager,
};
