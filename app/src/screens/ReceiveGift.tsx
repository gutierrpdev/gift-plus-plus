import React from 'react';
import { Gift } from '../domain';
import GlobalStyles from '../themes/global';
import Panel from '../components/Panel';
import ScreenHeader from '../components/ScreenHeader';
import PanelTitle from '../components/PanelTitle';
import PanelPrompt from '../components/PanelPrompt';
import { Button, Buttons } from '../components/Button';

interface Props {
  gift: Gift,
};

const ReceiveGift: React.FC<Props> = ({ gift }: Props) => (
  <>
    <GlobalStyles />
    <ScreenHeader gift={gift} title={"Brighton & Hove Museum"} />
    <Panel>
      {/* <Overlay /> */}
      <PanelTitle>Part 1</PanelTitle>
      <PanelPrompt background_image={'https://picsum.photos/600/600/?image=666'} text={"lorem ipsum"}></PanelPrompt>
      <Buttons>
        <Button>Show Clue</Button>
        <Button>OK</Button>
      </Buttons>
    </Panel>
  </>
);

export default ReceiveGift;