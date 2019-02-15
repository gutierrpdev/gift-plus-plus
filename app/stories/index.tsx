import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

// Components
import ScreenTitle from '../src/components/ScreenTitle';
import ScreenHeader from '../src/components/ScreenHeader';
import GiftPile from '../src/components/GiftPile';
import GiftPartsManager from '../src/components/GiftPartsManager';
// import GiftPartWrapper from '../src/components/GiftPartWrapper';
import Panel from '../src/components/Panel';
import PanelPrompt from '../src/components/PanelPrompt';
import { Button, Buttons } from '../src/components/Button';
import ScreenManager from '../src/components/ScreenManager';
import AudioPlayer from '../src/components/AudioPlayer';

// Screens
import ReceiveGift from '../src/screens/ReceiveGift';
import CreateGift from '../src/screens/CreateGift';
import Home from '../src/screens/Home';

// Data
import { giftThreeParts, giftTwoParts } from './fixtures';

storiesOf('Index', module)
  .add('Index', () => (
    <div>
      <button onClick={linkTo('Receiving', 'At Museum')}>Go to receiving</button>
    </div>
  ))
;

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

// const bgImage = import('../src/assets/test.png');

const bgImg = {
  // tslint:disable-next-line
  backgroundImage: "url(" + "https://www.blasttheory.co.uk/wp-content/uploads/2018/09/DSC07757_edit_feature-image-1920x1080.jpg" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};


// tslint:disable-next-line
// const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

storiesOf('Components', module)
  .add('Screen Title', () => <ScreenTitle>Lorem Ipsum</ScreenTitle>)
  .add('Screen Header', () => (
    <ScreenHeader gift={giftTwoParts} title={'title'} />
  ))
  .add('Gift Pile', () => <GiftPile gifts={twoGifts}>GiftPile</GiftPile>)
  // .add('Gift Part', () => (
  //   <GiftPartWrapper giftPartManager={new GiftPartsManager(null)} />
  // ))
  .add('Gift Parts', () => (
    <ScreenManager>
      <GiftPartsManager gift={giftThreeParts} />
    </ScreenManager>
  ))
  .add('Panel Prompt - just text', () => (
    <div style={greyBG}>
      <PanelPrompt text={'This text is quite long really, and a bit more, and a third line'} />
    </div>
  ))
  .add('Panel', () => (
    <div style={bgImg}>
      <Panel>
        <p>123</p>
      </Panel>
    </div>
  ))
  .add('Buttons', () => (
    <div style={bgImg}>
      <p>One button</p>
      <Buttons style={greyBG}>
        <Button onClick={action('clicked')}>Hello Button</Button>
      </Buttons>
      <p>Two buttons</p>
      <Buttons style={greyBG}>
        <Button>Hello Button</Button>
        <Button>OK Button</Button>
      </Buttons>
    </div>
  ))
  .add('Audio player', () => (
    <div style={bgImg}>
      <AudioPlayer
        preload={true}
        text={'Lorem ipsum'}
        src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
      />
    </div>
  ))
;

storiesOf('Components/Test Examples', module)
  .add('Button with text', () => <button onClick={action('clicked')}>Hello Button</button>)
  .add('Button with link', () => <button onClick={linkTo('Receiving', 'At Museum')}>Go to receiving</button>)
;
