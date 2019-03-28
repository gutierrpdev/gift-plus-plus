import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
// import { linkTo } from '@storybook/addon-links';

import { Gift } from '../src/domain';

// Components
import { ScreenTitle } from '../src/components/screen-title';
import { ScreenHeader } from '../src/components/screen-header';
// import { GiftPile } from '../src/components/gift-pile';
import { GlobalStyles } from '../src/themes/global';
import { GiftPartsManager } from '../src/components/receiving/gift-parts-manager';
import { IdleGiftPart } from '../src/components/receiving/idle-gift-part';
import { GiftPartWrapper } from '../src/components/receiving/gift-part-wrapper';
import { Panel } from '../src/components/panel';
import { PanelPrompt } from '../src/components/panel-prompt';
import { PanelImageReveal } from '../src/components/panel-image-reveal';
import { Button, Buttons } from '../src/components/buttons';
import { ScreenManager } from '../src/components/screen-manager';
import { AudioPlayer } from '../src/components/audio-player';
import { AudioRecorder } from '../src/components/audio-recorder';
import { WaitThen } from '../src/components/wait-then';
import { Gradient } from '../src/components/gradient';
import { AccordionTitle } from '../src/components/accordion-title';
import { ReceiveReply } from '../src/components/receiving/receive-reply';
import { ProgressLoader } from '../src/components/progress-loader';
import { PhotoCapture } from '../src/components/photo-capture';
import { TextAreaInput } from '../src/components/inputs/textarea-input';
import { TextInput } from '../src/components/inputs/text-input';

// Screens
import { ReceiveGift } from '../src/components/receiving/receive-gift';
import { CreateGift } from '../src/components/creating/create-gift';
import { Home } from '../src/screens/home';

// Receiving
import { ReceivingChooseLocation } from '../src/components/receiving/panels/choose-location';
import { ReceivingIntroContent } from '../src/components/receiving/panels/intro-content';
import { ReceivingPartContent } from '../src/components/receiving/panels/part-content';
import { LoadingGift } from '../src/components/receiving/loading-gift';

// Creating
import { CreateGiftStart } from '../src/components/creating/create-gift-start';
import { CreatingPartContent } from '../src/components/creating/part-content';
import { SignGift } from '../src/components/creating/sign-gift';

// Data
import { giftThreeParts, giftPart, emptyGift } from './fixtures';
import { ProgressBar } from '../src/components/progress-bar';

// Some useful bits to help...

// Handlers
function alertClicked() {
  alert('Clicked');
}

function logSomething( something?: string ) {
  // tslint:disable-next-line
  console.log( something || 'something' );
}

function doNothing() {
}

// Styles
const greyBG = {
  backgroundColor: 'grey',
  padding: '20px 10px',
};

const whiteText = {
  color: 'white',
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

storiesOf('Home', module)
  .add('Home', () => <Home />)
;

storiesOf('Creating', module)
  .add('Create gift', () => <CreateGift gift={emptyGift} />)
;

storiesOf('Receiving', module)
  .add('At museum', () => (
    <ReceiveGift gift={giftThreeParts} museumName={'Brighton & Hove Museum'} />
  ))
  // .add('Remotely', () => <h1>TODO</h1>)
;

storiesOf('Components', module)
  .add('Screen Title', () => <ScreenTitle>Lorem Ipsum</ScreenTitle>)
  .add('Screen Header', () => (
    <div>
      <p>Big header with logo</p>
      <ScreenHeader
        subTitle={`Sub title`}
        postSubTitle={`post sub title`}
        title={'Title'}
        postTitle={'post title'}
        showLogo={true}
        topPadding={false}
      />
      <p>Big header no logo</p>
      <ScreenHeader
        subTitle={`Sub title`}
        postSubTitle={`post sub title`}
        title={'Title'}
        postTitle={'post title'}
        showLogo={false}
        topPadding={false}
      />
      <p>Small header</p>
      <ScreenHeader
        subTitle={`Sub title`}
        postSubTitle={`post sub title`}
        title={'Title'}
        postTitle={'post title'}
        showLogo={false}
        topPadding={false}
      />
    </div>
  ))
  // .add('Gift Pile', () => <GiftPile gifts={twoGifts}>GiftPile</GiftPile>)
  .add('Panel Prompt text', () => (
    <div style={greyBG}>
      <PanelPrompt text={'lorem ipsum solus incum'} background={'transparent-black'} />
    </div>
  ))
  .add('Panel Image Reveal', () => (
    <div style={greyBG}>
      <PanelImageReveal imageUrl={'https://farm2.static.flickr.com/1913/45667899311_3d3e3a88d8_b.jpg'} />
    </div>
  ))
  .add('Panel', () => (
    <div style={bgImg}>
      <Panel>
        <p>Panel text</p>
        <Buttons>
          <Button>Button 1</Button>
          <Button>Button 2</Button>
        </Buttons>
      </Panel>
    </div>
  ))
  .add('Buttons', () => (
    <div style={{...bgImg, ...whiteText}}>
      <p>One button</p>
      <Buttons>
        <Button onClick={action('clicked')}>One button</Button>
      </Buttons>
      <p>Two buttons</p>
      <Buttons>
        <Button>Button 1</Button>
        <Button primary={true}>Button 2</Button>
      </Buttons>
      <p>There is a gradient below</p>
      <Gradient />
    </div>
  ))
  .add('Audio player', () => (
    <>
      <GlobalStyles />
      <p>Skip forward button</p>
      <AudioPlayer
        text={'Lorem ipsum'}
        forwardButton={'SkipSeconds'}
        src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
      />
      <p>Jump Go to End forward button</p>
      <AudioPlayer
        text={'Lorem ipsum'}
        forwardButton={'GoToEnd'}
        src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
      />
    </>
  ))
  .add('Audio recorder', () => (
    <>
      <GlobalStyles />
      <AudioRecorder
        text={'Record a greeting for Alexandria'}
      />
      <AudioRecorder
        text={'short'}
      />
      <AudioRecorder
        text={'this is quite long text and it should sit ok'}
      />
    </>
  ))
  .add('Wait and Then', () => (
    <div>
      <WaitThen
        wait={2}
        andThen={logSomething}
      />
    </div>
  ))
  .add('Gradient', () => (
    <div>
      <Gradient />
    </div>
  ))
  .add('Accordion Title', () => (
    <div style={greyBG}>
      <p>Big with Open</p>
      <AccordionTitle showOpenPrompt={true} textSize={'big'} textColour={'black'}>Big</AccordionTitle>
      <p>Mediun</p>
      <AccordionTitle showOpenPrompt={false} textSize={'medium'} textColour={'black'}>Mediun</AccordionTitle>
      <p>Small</p>
      <AccordionTitle showOpenPrompt={false} textSize={'small'} textColour={'black'}>Small</AccordionTitle>
      <p>Medium &amp; White</p>
      <AccordionTitle showOpenPrompt={false} textSize={'medium'} textColour={'white'}>
        Medium &amp; White
      </AccordionTitle>
    </div>
  ))
  .add('Idle Gift Part', () => (
    <div style={greyBG}>
      <p>Small</p>
      <IdleGiftPart
        part={giftPart}
        displaySize={'small'}
        isDisabled={false}
        onClick={alertClicked}
        showOpenPrompt={false}
        textColour={'black'}
      >
        Small
      </IdleGiftPart>
      <p>Medium &amp; disabled</p>
      <IdleGiftPart
        part={giftPart}
        displaySize={'medium'}
        isDisabled={true}
        onClick={alertClicked}
        showOpenPrompt={false}
        textColour={'black'}
      >
        Medium
      </IdleGiftPart>
      <p>Big &amp; open</p>
      <IdleGiftPart
        part={giftPart}
        displaySize={'medium'}
        isDisabled={false}
        onClick={alertClicked}
        showOpenPrompt={true}
        textColour={'black'}
      >
        Big
      </IdleGiftPart>
    </div>
  ))
  .add('Progress Bars', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <p>White on black</p>
      <ProgressBar percent={10} height={'5px'} theme={'white-on-black'}/>
      <p>Black on white</p>
      <ProgressBar percent={20} height={'10px'} theme={'black-on-white'}/>
      <p>Grey on black</p>
      <ProgressBar percent={30} height={'20px'} theme={'grey-on-black'}/>
    </div>
  ))
  .add('Progress Loader - white text', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <ProgressLoader text={'Loading'} colour='white' percent={25} />
    </div>
  ))
  .add('Progress Loader - grey text', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <ProgressLoader text={'Loading'} colour={'light-grey'} percent={25} />
    </div>
  ))
  .add('Photo Capture', () => (
    <>
    <GlobalStyles />
    <PhotoCapture text={'take a photo'}/>
    <PhotoCapture
      text={`Have a wander to find the second object for Nick.
        Why not visit another part of the museum?
        When you’ve found it take a photo to show them.`}
      textSize={30}
    />
    </>
  ))
  .add('Text Area Input', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <TextAreaInput />
      <TextAreaInput onTextChanged={(text) => logSomething(text)} />
      <TextAreaInput placeHolder={'enter something'} onTextChanged={(text) => logSomething(text)} />
      <TextAreaInput defaultValue={'lorem impsum'} onTextChanged={(text) => logSomething(text)} />
    </div>
  ))
  .add('Text Input', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <p>Text inputs</p><br/>
      <TextInput onTextChanged={(text) => logSomething(text)} />
      <TextInput placeHolder={'enter your name'} onTextChanged={(text) => logSomething(text)} />
      <TextInput
        placeHolder={'enter your name'}
        defaultValue={'lorem impsum'}
        onTextChanged={(text) => logSomething(text)}
      />
      <p>Email inputs</p><br/>
      <TextInput inputType='email' placeHolder={'enter your email'} onTextChanged={(text) => logSomething(text)} />
    </div>
  ))
;


// Receiving components
storiesOf('Components/Receiving', module)
  .add('Gift Part', () => (
    <GiftPartWrapper
      gift={giftThreeParts}
      giftPart={giftPart}
      onComplete={doNothing}
      recipientLocation={'AtMuseum'}
    />
  ))
  .add('Gift Parts', () => (
    <ScreenManager>
      <GlobalStyles />
      <GiftPartsManager gift={giftThreeParts} recipientLocation={'AtMuseum'} />
    </ScreenManager>
  ))
  .add('Choose location', () => <ReceivingChooseLocation doSetLocation={doNothing} museumName={'Hove'} />)
  .add('Intro', () => (
    <ReceivingIntroContent
      visible={true}
      onComplete={doNothing}
      recipientLocation={'AtMuseum'}
      audioIntroPlayed={true}
      handleAudioIntroPlayed={doNothing}
    />
  ))
  .add('Content', () => (
    <ReceivingPartContent
      visible={true}
      gift={giftThreeParts}
      giftPartIndex={0}
      onComplete={doNothing}
      recipientLocation={'AtMuseum'}
      revelImage={doNothing}
    />
  ))
  .add('Reply', () => (
    <ReceiveReply gift={giftThreeParts} visible={true} />
  ))
  .add('Loading gift', () => (
    <LoadingGift percent={37} />
  ))
;

// Creating components
storiesOf('Components/Creating', module)
  .add('Create Gift Start', () => (
    <>
      <GlobalStyles />
      <CreateGiftStart gift={emptyGift} onComplete={doNothing} onRecipientNameSet={doNothing} />
    </>
  ))
  .add('Create Gift Part', () => (
    <>
      <GlobalStyles />
      <CreatingPartContent
        gift={emptyGift}
        onComplete={doNothing}
      />
    </>
  ))
  .add('Sign gift - anonymous', () => (
    <>
      <GlobalStyles />
      <SignGift
        isVerifiedUser={false}
        gift={giftThreeParts}
      />
    </>
  ))
  .add('Sign gift - logged in', () => (
    <>
      <GlobalStyles />
      <SignGift
        isVerifiedUser={true}
        userName={'Nick'}
        gift={giftThreeParts}
      />
    </>
  ))
;
