import React from 'react'
import ReactDOM from 'react-dom';
import styled from 'styled-components/macro';
// import disableScroll from 'disable-scroll';

import Panel from './Panel';

/**
 * Manages panels
 */
const StyledPanelManager = styled.div`
  /* border: 1px solid orange; */
`

interface PanelManagerProps {
  // panels: Panel[];
};

interface PanelManagerState {
  activePanel: Panel,
};

export default class PanelManager extends React.PureComponent<PanelManagerProps, PanelManagerState> {

  panels:Panel[] = []; //this.props.panels; // The panels

  constructor(props: PanelManagerProps){
    super(props);

    // this.panels = this.props.panels;

    // default active to the first panel
    this.state = {
      activePanel: this.panels[0],
    };
    // console.log(this.panels);
  }

  handleClick = () => {
    console.log('The wrapper was clicked.');
  }

  addPanel(panel: Panel) {

    // set as first if it is
    if (!this.panels.length) {
      this.setState({
        activePanel: panel,
      })
    }

    // Add to the stack
    this.panels.push(panel);

  }

  // Go to the previous panel in the list
  previousPanel = () => {

    const panel = this.getPreviousPanel();

    if (panel) {

      // Set the current active panel
      this.setState({
        activePanel: panel,
      });

      // disableScroll.off();

      // Scroll the panel into view
      const element = ReactDOM.findDOMNode(panel) as HTMLElement;
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          left: 0,
          behavior: 'smooth',
        })
      }

      // disableScroll.on();
    }

  }

  getPreviousPanel() {

    // current index
    const currentIndex = this.panels.indexOf(this.state.activePanel);

    if (currentIndex === 0) {
      return null; // todo
    } else {
      return this.panels[currentIndex -1];
    }

  }



  // Go to the next panel in the list
  nextPanel = () => {

    const panel = this.getNextPanel();

    if (panel) {

      // Set the current active panel
      this.setState({
        activePanel: panel,
      });

      // disableScroll.off();

      // Scroll the panel into view
      const element = ReactDOM.findDOMNode(panel) as HTMLElement;
      if (element) {
        window.scrollTo({
          top: element.offsetTop,
          left: 0,
          behavior: 'smooth',
        })
      }

      // disableScroll.on();
    }

  }

  getNextPanel() {
    // current index
    const currentIndex = this.panels.indexOf(this.state.activePanel);

    if (currentIndex == this.panels.length) {
      return null; // todo
    } else {
      return this.panels[currentIndex +1];
    }

  }

  render() {
    // disableScroll.on();
    console.log(this.panels);
    return (
      <StyledPanelManager>
        {this.props.children}
      </StyledPanelManager>
    )
  }
}