import React from 'react';
// import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';
import { AudioPlayer } from '../audio-player';


export const Test: React.FC = () => {

  return (
    <Test>
      <Panel>
        <PanelContent>
          <AudioPlayer
              text={'A message to you before you start...'}
              src={require('../assets/audio/_1-second-of-silence.mp3')}
          />
        </PanelContent>
        <Buttons>
          {/* <Button onClick={this.nextPanel}>Skip</Button> */}
          {/* <Button onClick={this.nextPanel}>OK</Button> */}
        </Buttons>
      </Panel>

      <Panel>
        <PanelContent>
          <AudioPlayer
              text={'One thing before you start...'}
              src={require('../assets/audio/_1-second-of-silence.mp3')}
          />
        </PanelContent>
        <Buttons>
          {/* <Button onClick={this.nextPanel}>OK</Button> */}
        </Buttons>
      </Panel>

      <Panel>
        <PanelContent>
          <PanelPrompt text={'lorem ipsum'} />
        </PanelContent>
        <Buttons>
          <Button>Show Clue</Button>
          {/* <Button onClick={this.nextPanel}>OK</Button> */}
        </Buttons>
      </Panel>

      <Panel>
        <PanelContent>
          <PanelPrompt text={'Great, thanks'} />
        </PanelContent>
        <Buttons>
          {/* <Button onClick={this.nextPanel}>OK</Button> */}
        </Buttons>
      </Panel>
    </Test>
  );
};
