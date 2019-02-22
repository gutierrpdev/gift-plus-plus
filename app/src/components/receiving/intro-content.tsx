import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
// import { PanelPrompt } from '../panel-prompt';
import { Buttons, Button } from '../buttons';

// Todo : finish question
const ReceivingIntroContent: React.FC = () => {
  const [location, setLocation] = useState('');

  useEffect(() => {
    document.title = `You clicked ${location}`;
  });

  function handleAtMuseum() {
    setLocation('museum');
  }

  function handleNotAtMuseum() {
    setLocation('not at museum');
  }

  // console.log(location);
  return (
    <Panel>
      <PanelContent>
        content
      </PanelContent>
      <Buttons>
        <Button onClick={handleAtMuseum}>Content</Button>
        <Button onClick={handleNotAtMuseum}>Content</Button>
      </Buttons>
    </Panel>
  );
};

export {
  ReceivingIntroContent,
};
