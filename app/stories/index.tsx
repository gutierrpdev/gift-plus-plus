import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// Components
import ScreenTitle from '../src/components/ScreenTitle';
import ScreenHeader from '../src/components/ScreenHeader';
import GiftPile from '../src/components/GiftPile';
import GiftPartsManager from '../src/components/GiftPartsManager';
import PanelPrompt from '../src/components/PanelPrompt';
import { Button } from '../src/components/Button';
import ScreenManager from '../src/components/ScreenManager';
import AudioPlayer from '../src/components/AudioPlayer';

// Screens
import ReceiveGift from '../src/screens/ReceiveGift';
import CreateGift from '../src/screens/CreateGift';
import Home from '../src/screens/Home';

// Data
import { giftThreeParts, giftTwoParts } from './fixtures';


storiesOf('Home', module)
  .add('Home', () => <Home />)
;

storiesOf('Creating', module)
  .add('Create gift', () => <CreateGift />)
;

storiesOf('Receiving', module)
  .add('At museum', () => (
    <ReceiveGift gift={giftThreeParts} museumName={'Brighton & Hove Museum'} />
  ))
  .add('Remotely', () => <h1>TODO</h1>)
;

// Some reusable parts
const greyBG = {
  backgroundColor: 'grey',
};
const twoGifts = [giftThreeParts, giftTwoParts];

// tslint:disable-next-line
const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

storiesOf('Components', module)
  .add('Screen Title', () => <ScreenTitle>Lorem Ipsum</ScreenTitle>)
  .add('Screen Header', () => (
    <ScreenHeader gift={giftTwoParts} title={'title'} />
  ))
  .add('Gift Pile', () => <GiftPile gifts={twoGifts}>GiftPile</GiftPile>)
  .add('Gift Parts', () => (
    <ScreenManager>
      <GiftPartsManager gift={giftThreeParts} />
    </ScreenManager>
  ))
  .add('Panel Prompt - just text', () => (
    <div style={greyBG}>
      <PanelPrompt text={longText} />
    </div>
  ))
  // .add('Panel Prompt - with image', () => (
  //   <PanelPrompt backgroundImage='https://picsum.photos/600/600/?image=676' text={longText} />
  // ))
  .add('Button with text', () => (
    <div style={greyBG}><Button onClick={action('clicked')}>Hello Button</Button></div>
  ))
  .add('Audio player', () => (
    <AudioPlayer
      text={'Lorem ipsum'}
      src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
    />
  ))
;

storiesOf('Components/Test Examples', module)
  .add('Button with text', () => <button onClick={action('clicked')}>Hello Button</button>)
  .add('Button with link', () => <button onClick={linkTo('Receiving', 'At Museum')}>Go to receiving</button>)
;
