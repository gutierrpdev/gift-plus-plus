import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// Components
import ScreenTitle from '../src/components/ScreenTitle';
import GiftPile from '../src/components/GiftPile';
import GiftPartWrapper from '../src/components/GiftPartWrapper';
import GiftPartsManager from '../src/components/GiftPartsManager';
import Panel from '../src/components/Panel';
import PanelManager from '../src/components/PanelManager';
import PanelPrompt from '../src/components/PanelPrompt';
import { Button } from '../src/components/Button';

// Screens
import ReceiveGift from '../src/screens/ReceiveGift';
import CreateGift from '../src/screens/CreateGift';
import Home from '../src/screens/Home';

// Panels
import simplePanel from '../src/components/panels/test/SimplePanel';

// Test
import TestPanelManager from '../stories/test/TestPanelManager';

// Data
import { giftThreeParts } from './fixtures';
import SimplePanel from '../src/components/panels/test/SimplePanel';


storiesOf('Home', module)
  .add('Home', () => <Home />)
;

storiesOf('Creating', module)
  .add('Create gift', () => <CreateGift />)
;

storiesOf('Receiving', module)
  .add('At museum', () => <ReceiveGift gift={giftThreeParts} />)
  .add('Remotely', () => <h1>TODO</h1>)
;

// Some reusable parts
const greyBG = {
  backgroundColor: 'grey',
};
const threeGifts = [giftThreeParts, giftThreeParts, giftThreeParts];

// tslint:disable-next-line
const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

storiesOf('Components', module)
  .add('Screen Title', () => <ScreenTitle>Lorem Ipsum</ScreenTitle>)
  .add('Gift Pile', () => <GiftPile gifts={threeGifts}>GiftPile</GiftPile>)
  .add('Gift Parts', () => (
    <GiftPartsManager gifts={threeGifts}>
      <GiftPartWrapper />
      <GiftPartWrapper />
      <GiftPartWrapper />
    </GiftPartsManager>
  ))
  .add('Panel Prompt - just text', () => (
    <div style={greyBG}>
      <PanelPrompt text={longText} />
    </div>
  ))
  .add('Panel Prompt - with image', () => (
    <PanelPrompt backgroundImage='https://picsum.photos/600/600/?image=676' text={longText} />
  ))
  .add('Panel Test2', () => (
    <TestPanelManager />
  ))
  .add('Button with text', () => (
    <div style={greyBG}><Button onClick={action('clicked')}>Hello Button</Button></div>
  )
;


storiesOf('Components/Test Examples', module)
  .add('Button with text', () => <button onClick={action('clicked')}>Hello Button</button>)
  .add('Button with link', () => <button onClick={linkTo('Receiving', 'At Museum')}>Go to receiving</button>)
;
