import React /*, { useState, useEffect }*/ from 'react';
// import styled from 'styled-components';

import { Panel, PanelContent, PanelProps } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';

// Todo : finish question
class ReceivingChooseLocation extends React.PureComponent<PanelProps, {}> {
// const ReceivingChooseLocation: React.FC = (props) => {

  private panel: Panel | null = null;
  // private const [location, setLocation] = useState('');

  // useEffect(() => {
  //   document.title = `You clicked ${location}`;
  // });

  public handleAtMuseum() {
    // setLocation('museum');
  }

  public handleNotAtMuseum = () => {
    // console.log(this.panel);
    // console.log('1');
    // setLocation('not at museum');
    if (this.panel) {
      this.panel.nextPanel();
    }
  }

  // console.log({location});

  public render() {

    return (
      <Panel {...this.props} ref={(ref) => { this.panel = ref; }}>
        <PanelContent>
          <PanelPrompt text={'Are you at the museum?'} />
        </PanelContent>
        <Buttons>
          <Button onClick={this.handleAtMuseum}>Yes</Button>
          <Button onClick={this.handleNotAtMuseum}>No</Button>
        </Buttons>
      </Panel>
    );

  }
}

export {
  ReceivingChooseLocation,
};
