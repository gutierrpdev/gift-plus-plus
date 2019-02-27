import React /*, { useState, useEffect } */ from 'react';

import { StyledPanel, PanelContent, PanelProps } from '../../panel';
import { Buttons } from '../../buttons';

// Todo : finish question
const ReceivingIntroContent: React.FC<PanelProps> = (panelProps) => {

  // const [location, setLocation] = useState('');

  // useEffect(() => {
  //   document.title = `You clicked ${location}`;
  // });

  return (
    <StyledPanel {...panelProps}>
      <PanelContent>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Eveniet et qui deleniti? Nostrum exercitationem vel deserunt veniam dolore! Veritatis, facere.
          Expedita, dignissimos voluptate. Voluptatibus, in perspiciatis iusto labore unde recusandae.</p>
      </PanelContent>
      <Buttons>
        {/* <Button onClick={handleAtMuseum}>OK</Button> */}
        {/* <Button onClick={handleNotAtMuseum}>OK</Button> */}
      </Buttons>
    </StyledPanel>
  );
};

export {
  ReceivingIntroContent,
};
