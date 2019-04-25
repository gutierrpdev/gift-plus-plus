import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { setImageOrientation, getImageOrientation, calcImageOrientationChange } from '../src/utils/image';

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
import { PanelRound } from '../src/components/panel-round';
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
import { InfoPopover } from '../src/components/info-popover';
import { WorkingModal } from '../src/components/working-modal';
import { MessageModal } from '../src/components/message-modal';
import { canUseAudioRecorder } from '../src/utils/use-audio-recorder';
import { PageChangeDetect } from '../src/components/page-change-detect';
import { isIosDeviceUsingChrome } from '../src/utils/helpers';
import { SignIn } from '../src/components/home/signin';

// Screens
import { ReceiveGift } from '../src/components/receiving/receive-gift';
import { CreateGift } from '../src/components/creating/create-gift';
import { HomeScreen } from '../src/screens/home';

// Receiving
import { ReceivingChooseLocation } from '../src/components/receiving/panels/choose-location';
import { ReceivingIntroContent } from '../src/components/receiving/panels/intro-content';
import { ReceivingPartContent } from '../src/components/receiving/panels/part-content';
import { WorkingProgress } from '../src/components/working-progress';

// Creating
import { CreateGiftIntro } from '../src/components/creating/intro';
import { CreateGiftChooseRecipient } from '../src/components/creating/choose-recipient';
import { CreateGiftRecordAndPlayback } from '../src/components/creating/record-and-playback';
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

const fullScreen = {
  height: '100vh',
  width: '100vw',
};

// const twoGifts = [giftThreeParts, giftTwoParts];
// const bgImage = import('../src/assets/test.jpg');

const bgImg = {
  // tslint:disable-next-line
  backgroundImage: 'url(https://farm2.static.flickr.com/1913/45667899311_3d3e3a88d8_b.jpg)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
};

storiesOf('Home', module)
  .add('Home', () => (
    <BrowserRouter>
      <HomeScreen />
    </BrowserRouter>
  ))
  .add('Sign in', () => (
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  ))
;

storiesOf('Creating', module)
  .add('Create gift', () => (
    <>
      <GlobalStyles />
      <BrowserRouter>
        <CreateGift gift={emptyGift} />
      </BrowserRouter>
    </>
  ))
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
      />
      <p>Big header no logo</p>
      <ScreenHeader
        subTitle={`Sub title`}
        postSubTitle={`post sub title`}
        title={'Title'}
        postTitle={'post title'}
        showLogo={false}
      />
      <p>Small header</p>
      <ScreenHeader
        subTitle={`Sub title`}
        postSubTitle={`post sub title`}
        title={'Title'}
        postTitle={'post title'}
        showLogo={false}
      />
    </div>
  ))
  // .add('Gift Pile', () => <GiftPile gifts={twoGifts}>GiftPile</GiftPile>)
  .add('Panel Round', () => (
    <div style={greyBG}>
      <PanelRound border='dotted-white' background='transparent-black' />
      <PanelRound border='none' background='solid-white' />
    </div>
  ))
  .add('Panel Prompt text', () => (
    <div style={greyBG}>
      <PanelPrompt text={'lorem ipsum solus incum'} background={'transparent-black'} />
    </div>
  ))
  .add('Panel Image Reveal', () => (
    <div style={{...greyBG, ...fullScreen}}>
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
        <Button onClick={logSomething}>One button</Button>
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
      <div style={bgImg}>
        <GlobalStyles />
        <p>Skip forward button</p>
        <AudioPlayer
          text={'Lorem ipsum'}
          forwardButton={'SkipSeconds'}
          src={'https://sample-videos.com/audio/mp3/crowd-cheering.mp3'}
        />
      </div>
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
        status={'idle'}
        text={'Record a greeting for Alexandria'}
        onClick={doNothing}
      />
      <AudioRecorder
        status={'recording'}
        text={'short'}
        onClick={doNothing}
      />
      <AudioRecorder
        status={'processing'}
        text={'this is quite long text and it should sit ok'}
        onClick={doNothing}
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
    <img id='photo-capture-img' style={{maxWidth: '200px'}} />
    {/* <PhotoCapture text={'take a photo'}/> */}
    <PhotoCapture
      text={`Have a wander to find the second object for Nick.
        Why not visit another part of the museum?
        When you’ve found it take a photo to show them.`}
      textSize={30}
      onPhotoTaken={ ( imageUrl: string ) => {
        const img: HTMLImageElement = document.getElementById('photo-capture-img') as HTMLImageElement;
        img.src = imageUrl;
      }}
    />
    </>
  ))
  .add('Image rotate', () => {
    document.addEventListener('DOMContentLoaded', () => {

      const originalImage: HTMLImageElement = document.getElementById('rotate-img') as HTMLImageElement;
      const resetImage: HTMLImageElement = document.getElementById('reset-img') as HTMLImageElement;

      // Change orientation
      setImageOrientation(originalImage.src, 5, (rotatedImageUrl) =>  {
        resetImage.src = rotatedImageUrl;
      });

    });
    const image = require('../src/assets/test.jpg');
    const imgStyle = {
      maxWidth: '150px',
      display: 'block',
      marginBottom: '10px',
    };
    return (
      <>
        <p>Rotate the image</p>
        <img
          id='rotate-img'
          src={image}
          style={imgStyle}
        />
        <img
          id='reset-img'
          style={imgStyle}
        />
      </>
    );
  })
  .add('Image select and rotate', () => {
    document.addEventListener('DOMContentLoaded', () => {

      const fileInput = document.getElementById('file-input');
      const imageRotateResult = document.getElementById('image-rotate-result');
      const imageRotateCalc = document.getElementById('image-rotate-calc');
      const resetImage1: HTMLImageElement = document.getElementById('reset-img1') as HTMLImageElement;

      if (fileInput) {

        fileInput.onchange = (e) => {

          if (e.target) {

            const target = e.target as HTMLInputElement;

            if (target && target.files) {

              const file = target.files[0];

              getImageOrientation(file, (orientation) => {

                if (imageRotateResult) {
                  imageRotateResult.innerHTML = 'Source image orientation = ' + orientation;
                }

                const url = URL.createObjectURL(file);

                const change = calcImageOrientationChange(orientation);
                if (imageRotateCalc) {
                  imageRotateCalc.innerHTML = 'Orientation calculation = ' + change;
                }

                setImageOrientation(url, change, (rotatedImageUrl) =>  {
                  resetImage1.src = rotatedImageUrl;
                });

              });

            }

          }

        };

      }

    });
    const imgStyle = {
      maxWidth: '150px',
      display: 'block',
      marginBottom: '10px',
    };
    return (
      <>
        <p>Select image, detect orientation, then rotate image</p>
        <input id='file-input' type='file' accept='image/*' />
        <p id='image-rotate-result' />
        <p id='image-rotate-calc' />
        <img
          id='reset-img1'
          style={imgStyle}
        />
      </>
    );
  })
  .add('Text Area Input', () => (
    <div style={greyBG}>
      <GlobalStyles />
      <TextAreaInput onEnterPressed={() => {alert('Enter pressed'); }} />
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
        onEnterPressed={() => {alert('enter pressed'); }}
      />
      <p>Email inputs</p><br/>
      <TextInput inputType='email' placeHolder={'enter your email'} onTextChanged={(text) => logSomething(text)} />
    </div>
  ))
  .add('Sharing links', () => (
    <>
      <h1>Sharing links</h1>
      <p>
        {/* tslint:disable-next-line */}
        <a href='mailto:?&subject=Here is a Gift&body=Nick%20has%20sent%20you%20a%20Gift%20%0Ahttps%3A//thegift.app/'>Send Email</a>
      </p>
      <p>
        {/* tslint:disable-next-line */}
        <a target='_blank' href='https://www.facebook.com/sharer/sharer.php?u=https%3A//thegift.app/'>Share on Facebook</a>
      </p>
      <p>
        <a href='fb-messenger://share/?link=https%3A%2F%2Fthegift.app'>Share In Facebook Messenger (mobile only)</a>
      </p>
      <p>
        <a target='_blank' href='https://twitter.com/home?status=https%3A//thegift.app/'>Share on Twitter</a>
      </p>
      <p>
        {/* tslint:disable-next-line */}
        <a href='whatsapp://send?text=Here%27s%20a%20gift%20https%3A%2F%2Fthegift.app%2F' data-action='share/whatsapp/share' target='_blank'>Share via Whatsapp (mobile only)</a>
      </p>
      <p>
        <a href='sms:&body=Here%27s%20a%20gift%20https%3A%2F%2Fthegift.app'>Share via SMS iOS</a>
      </p>
      <p>
        <a href='sms:?body=Here%27s%20a%20gift%20https%3A%2F%2Fthegift.app'>Share via SMS Android</a>
      </p>
    </>
  ))
  .add('Info Popover', () => (
    <>
      <InfoPopover onClose={doNothing}>
        <h1>Privacy</h1>
        <h2>Sub heading</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum.
        Semper feugiat nibh sed pulvinar proin.</p>
      </InfoPopover>
    </>
  ))
  .add('Working Modal', () => (
    <>
      <WorkingModal
        message='Hey, we need to get online to do some magic.'
      />
    </>
  ))
  .add('Message Modal', () => (
    <>
      <GlobalStyles />
      <MessageModal>
        <p>There seems to be a problem with the internet.</p>
        <p>Reboot it.</p>
        <BrowserRouter>
          <Button><Link to='your-gifts'>Go to Your Gifts</Link></Button>
        </BrowserRouter>
      </MessageModal>
    </>
  ))
  .add('Tab close detect', () => (
    <>
      <BrowserRouter>
        <PageChangeDetect />
          <div><a href='http://www.google.com'>Go to Google</a></div>
          <Link to='your-gifts'>Go to Your Gifts</Link>
      </BrowserRouter>
    </>
  ))
;

// Tests
storiesOf('Tests', module)
  .add('Mask', () => (
    <>
      <svg xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink'>
        <defs>
          <filter id='blurlayer' width='110%' height='100%'>
            <feGaussianBlur  stdDeviation='4' result='blur'/>
              {/* tslint:disable-next-line */}
              <feImage id='feimage' xlinkHref='https://www.blasttheory.co.uk/wp-content/uploads/2019/04/IMG_8846-1440x1080.jpg' x='0' y='0'  height='300px' width='300px' result='mask' />
          </filter>
        </defs>
      </svg>
      <svg width='568' height='426'>
        {/* tslint:disable-next-line */}
        <image href='https://www.blasttheory.co.uk/wp-content/uploads/2019/04/IMG_8846-1440x1080.jpg' width='500' height='350' mask='url(#masking2)' />
      </svg>
      <svg width='0' height='0'>
        <defs>
          <linearGradient id='gradient' x1='0' y1='00%' x2='0' y2='100%'>
            <stop stop-color='black' offset='0'/>
            <stop stop-color='white' offset='1'/>
          </linearGradient>
          <mask id='masking2' maskUnits='objectBoundingBox' maskContentUnits='objectBoundingBox'>
            <rect y='0.3' width='1' height='.7' fill='url(#gradient)' />
            <circle cx='.5' cy='.5' r='.35' fill='white' />
          </mask>
        </defs>
      </svg>
    </>
  ))
  .add('Audio recorder detection', () => {
    const canUseAudioRec = canUseAudioRecorder();
    // console.log(canUseAudioRec);
    // console.log(navigator.mediaDevices.getUserMedia);
    return (
      <p>Can use audio = {canUseAudioRec.toString()}</p>
    );
  })
  .add('Is Chrome on iOS', () => {
    const chromeOnIos = isIosDeviceUsingChrome();
    return (
      <p>Is Chrome on iOS = {chromeOnIos.toString()}</p>
    );
  })
  ;

// Receiving components
storiesOf('Components/Receiving', module)
  .add('Gift Part', () => (
    <>
    {/*hack the height*/}
    <style>{'\
      #root > div {\
        height: 100vh;\
      }\
    '}</style>
      <GiftPartWrapper
        gift={giftThreeParts}
        giftPart={giftPart}
        onComplete={doNothing}
        recipientLocation={'AtMuseum'}
      >
        <PanelImageReveal imageUrl={'https://farm2.static.flickr.com/1913/45667899311_3d3e3a88d8_b.jpg'} />
      </GiftPartWrapper>
    </>
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
      revealBackgroundImage={doNothing}
      revealPreviewImage={doNothing}
    />
  ))
  .add('Reply', () => (
    <ReceiveReply gift={giftThreeParts} />
  ))
  .add('Loading gift', () => (
    <WorkingProgress text='Loading' percent={37} />
  ))
;

// Creating components
storiesOf('Components/Creating', module)
  .add('Intro', () => (
    <>
      <GlobalStyles />
      <CreateGiftIntro onComplete={doNothing} />
    </>
  ))
  .add('Choose Recipient', () => (
    <>
      <GlobalStyles />
      <CreateGiftChooseRecipient onComplete={logSomething} />
    </>
  ))
  .add('Record and Playback', () => (
    <>
      <GlobalStyles />
      <CreateGiftRecordAndPlayback
        text={'Record something'}
        saveButtonText={'Save something'}
        onComplete={logSomething}
      />
    </>
  ))
  .add('Create Gift Part', () => (
    <>
      <GlobalStyles />
      <CreatingPartContent
        recipientName={'Nick'}
        onComplete={doNothing}
      />
    </>
  ))
  .add('Sign gift', () => (
    <>
      <GlobalStyles />
      <SignGift />
    </>
  ))
;
