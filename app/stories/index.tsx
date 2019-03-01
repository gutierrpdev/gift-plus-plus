import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

// Components
import { ScreenTitle } from '../src/components/screen-title';
import { ScreenHeader, ScreenHeaderSize } from '../src/components/screen-header';
// import { GiftPile } from '../src/components/gift-pile';
import { GiftPartsManager } from '../src/components/receiving/gift-parts-manager';
import { GiftPartWrapper, GiftPartWrapperStatus } from '../src/components/receiving/gift-part-wrapper';
import { StyledPanel } from '../src/components/panel';
import { PanelPrompt } from '../src/components/panel-prompt';
import { PanelImage } from '../src/components/panel-image';
import { Button, Buttons } from '../src/components/buttons';
import { ScreenManager } from '../src/components/screen-manager';
import { AudioPlayer } from '../src/components/audio-player';
import { WaitThen } from '../src/components/wait-then';

// Screens
import { ReceiveGift } from '../src/screens/receive-gift';
import { CreateGift } from '../src/screens/create-gift';
import { Home } from '../src/screens/home';

// Receiving Part 1
import { ReceivingChooseLocation, GiftLocation } from '../src/components/receiving/panels/choose-location';
import { ReceivingIntroContent } from '../src/components/receiving/panels/intro-content';
import { ReceivingPartContent } from '../src/components/receiving/panels/part-content';

// Data
import { giftThreeParts, giftTwoParts, giftPart } from './fixtures';

// storiesOf('Index', module)
//   .add('Index', () => (
//     <div>
//       <button onClick={linkTo('Receiving', 'At Museum')}>Go to receiving</button>
//     </div>
//   ))
// ;

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
  // .add('Remotely', () => <h1>TODO</h1>)
;

// Some reusable parts
const greyBG = {
  backgroundColor: 'grey',
};
// const twoGifts = [giftThreeParts, giftTwoParts];

// const bgImage = import('../src/assets/test.jpg');

const bgImg = {
  // tslint:disable-next-line
  backgroundImage: "url(" + "https://farm2.static.flickr.com/1913/45667899311_3d3e3a88d8_b.jpg" + ")",
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

const whiteText = {
  color: 'white',
};


// tslint:disable-next-line
// const longText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.'

// Create this instance to keep TypeScript happy
const giftPartManager = new GiftPartsManager({gift: giftThreeParts, onClick: doNothing});

storiesOf('Components', module)
  .add('Screen Title', () => <ScreenTitle>Lorem Ipsum</ScreenTitle>)
  .add('Screen Header', () => (
    <div>
      <p>Big header</p>
      <ScreenHeader gift={giftTwoParts} title={'title'} size={ScreenHeaderSize.Big} />
      <p>Small header</p>
      <ScreenHeader gift={giftTwoParts} title={'title'} size={ScreenHeaderSize.Small} />
    </div>
  ))
  // .add('Gift Pile', () => <GiftPile gifts={twoGifts}>GiftPile</GiftPile>)
  .add('Gift Part', () => (
    <GiftPartWrapper
      giftPartManager={giftPartManager}
      gift={giftThreeParts}
      giftPart={giftPart}
      giftPartIndex={0}
      status={GiftPartWrapperStatus.Open}
      onClick={doNothing}
    />
  ))
  .add('Gift Parts', () => (
    <ScreenManager>
      <GiftPartsManager gift={giftThreeParts} />
    </ScreenManager>
  ))
  .add('Panel Prompt text', () => (
    <div style={greyBG}>
      <PanelPrompt text={'lorem ipsum solus incum'} />
    </div>
  ))
  .add('Panel Image', () => (
    <div style={greyBG}>
      <PanelImage imageSrc={'https://farm2.static.flickr.com/1913/45667899311_3d3e3a88d8_b.jpg'} />
    </div>
  ))
  .add('Panel', () => (
    <div style={bgImg}>
      <StyledPanel>
        <p>Panel text</p>
        <Buttons>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Buttons>
      </StyledPanel>
    </div>
  ))
  .add('Buttons', () => (
    <div style={{...bgImg, ...whiteText}}>
      <p>One button</p>
      <Buttons style={greyBG}>
        <Button onClick={action('clicked')}>One button</Button>
      </Buttons>
      <p>Two buttons</p>
      <Buttons style={greyBG}>
        <Button>Button 1</Button>
        <Button>Button 2</Button>
      </Buttons>
      <p>Not hidden button</p>
      <Button invisible={false}>You can see me</Button>
      <p>Hidden button (should occupy space)</p>
      <Button invisible={true}>I am hidden</Button>
    </div>
  ))
  .add('Audio player', () => (
    <div>
      <AudioPlayer
        preload={true}
        text={'Lorem ipsum'}
        src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
      />
    </div>
  ))
  .add('Wait and Then', () => (
    <div>
      <WaitThen
        wait={2}
        andThen={logSomething}
      />
    </div>
  ))
;

// function showAlert() {
//   alert('1');
// }

function logSomething() {
  // tslint:disable-next-line
  console.log('something');
}


// To hookup to events to keep TypeScript happy
function doNothing() {
}

// storiesOf('Components/Test Examples', module)
//   .add('Button with text', () => <button onClick={action('clicked')}>Hello Button</button>)
//   .add('Button with link', () => <button onClick={linkTo('Receiving', 'At Museum')}>Go to receiving</button>)
// ;

storiesOf('Receiving/Part 1', module)
  .add('Choose location', () => <ReceivingChooseLocation doSetLocation={doNothing} />)
  .add('Intro', () => (
    <ReceivingIntroContent
      visible={true}
      doComplete={doNothing}
      giftLocation={GiftLocation.AtMuseum}
      audioIntroPlayed={true}
      handleAudioIntroPlayed={doNothing}
    />
  ))
  .add('Content', () => (
    <ReceivingPartContent
      visible={true}
      gift={giftThreeParts}
      giftPartIndex={0}
      doComplete={doNothing}
      giftLocation={GiftLocation.AtMuseum}
    />
  ))
;
