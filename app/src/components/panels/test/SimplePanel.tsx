import React from 'react'

import { Button } from '../../Button';

import Panel from '../../Panel';

class SimplePanel extends Panel {
  render() {
    return (
      <Panel>
        Simple Panel
        <Button onClick={this.nextPanel}>Next</Button>
      </Panel>
    )
  }
}

export default SimplePanel;