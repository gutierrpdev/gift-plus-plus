import React from 'react';

import { Button } from '../../src/components/Button';
import Panel from '../../src/components/Panel';
import PanelManager from '../../src/components/PanelManager';

export default class TestPanelManager extends PanelManager {

  public render() {
    return (
      <PanelManager>

        <Panel
          panelManager={this}
          ref={(ref) => { this.addPanel(ref); }}
        >
          Panel 1
          <Button onClick={this.nextPanel}>Next</Button>
        </Panel>

        <Panel
          panelManager={this}
          ref={(ref) => { this.addPanel(ref); }}
        >
          Panel 2
          <Button onClick={this.previousPanel}>Back</Button>
        </Panel>
      </PanelManager>
    );
  }
}
