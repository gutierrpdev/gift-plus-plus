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
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eveniet et qui deleniti? Nostrum exercitationem vel deserunt veniam dolore! Veritatis, facere. Expedita, dignissimos voluptate. Voluptatibus, in perspiciatis iusto labore unde recusandae.</p>
      </PanelContent>
      <Buttons>
        <Button onClick={handleAtMuseum}>OK</Button>
        <Button onClick={handleNotAtMuseum}>OK</Button>
      </Buttons>
    </Panel>
  );
};

export {
  ReceivingIntroContent,
};
