import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ScreenTitle from '../src/components/ScreenTitle';
import GiftPile from '../src/components/GiftPile';
import H5AudioPlayer from '../src/components/AudioPlayer';
import PanelPrompt from '../src/components/PanelPrompt';
import { Button } from '../src/components/Button';

import ReceiveGift from '../src/screens/ReceiveGift';
import CreateGift from '../src/screens/CreateGift';
import Home from '../src/screens/Home';

import { giftThreeParts } from './fixtures';

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

const greyBG = {
  backgroundColor: 'grey',
}

storiesOf('Components', module)
.add('Screen Title', () => <ScreenTitle>Lorem Ipsum</ScreenTitle>)
.add('Gift Pile', () => <GiftPile gifts={[giftThreeParts, giftThreeParts, giftThreeParts]}>GiftPile</GiftPile>)
.add('Audio Player', () => <H5AudioPlayer src='https://sample-videos.com/audio/mp3/wave.mp3'></H5AudioPlayer>)
.add('Panel Prompt - just text', () => <div style={greyBG}><PanelPrompt text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'}></PanelPrompt></div>)
.add('Panel Prompt - with image', () => <PanelPrompt background_image='https://picsum.photos/600/600/?image=676' text={'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'}></PanelPrompt>)
.add('Button with text', () => <div style={greyBG}><Button onClick={action('clicked')}>Hello Button</Button></div>)
;

storiesOf('Components/Test Examples', module)
  .add('Button with text', () => <button onClick={action('clicked')}>Hello Button</button>)
  .add('Button with link', () => <button onClick={linkTo('Receiving', 'At Museum')}>Go to receiving</button>)
;
