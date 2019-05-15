import React, { useState } from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';

import { ScreenTitle } from './screen-title';
import { ScreenSubTitle } from './screen-sub-title';
import { ScreenPostTitle } from './screen-post-title';
import { ScreenLogo } from './screen-logo';
import { InformationWindow } from './modals/information-window';
import { Gradient } from './gradient';
import { Menu, MenuBurger } from './home/menu';
import { HeaderCloseButton } from './home/header-close-button';
import { TextResize } from './text-resize';


/***
 * Global screen header
 */


// Texts wrapper
const HeaderTexts = styled.div`
  width: 80%;
  position: relative;
  left: 10%;
`;

// Message
const HeaderMessage = styled.div`
  margin: 8% auto;
  width: 80%;
  text-align: center;
`;

const HeaderMessageTextResize = styled(TextResize)`
  line-height: 1.3;
`;

// Header
const ScreenHeaderStyle = styled.div<Props>`
  width: 100%;
  padding: 5% 2% 3%;
  z-index: 2000; // high to aid the menu
  position: relative;
  // Smaller padding on tablets
  @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
    padding: 3% 0;
  }
  ${(props) => props.topPadding === 'small' && `
    padding-top: 7%;
    // Smaller padding on mobiles
    @media (min-aspect-ratio: ${global.aspectRatio.iPhone5}) {
      padding: 2% 2%;
    }
    // Smaller padding on tablets
    @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
      padding: 1% 1%;
    }
  `}
  ${(props) => props.topPadding === 'medium' && `
    padding-top: 20%;
    // Smaller padding on smaller ratio screens
    @media (min-aspect-ratio: ${global.aspectRatio.iPhone5}) {
      padding: 10% 5%;
    }
    @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
      padding: 5% 3%;
    }
  `}
  ${(props) => props.topPadding === 'large' && `
    padding-top: 30%;
    // Smaller padding on smaller ratio screens
    @media (min-aspect-ratio: ${global.aspectRatio.iPhone5}) {
      padding: 15% 10% 5%;
    }
    @media (min-aspect-ratio: ${global.aspectRatio.iPad}) {
      padding: 10% 6% 3%;
    }
  `}
  ${(props) => props.background === 'white' && `
    background-color: white;
  `}
  ${(props) => props.background === 'transparent-white' && `
    background-color: rgba(255,255,255, 0.8);
  `}
`;

interface Props {
  showLogo?: boolean;
  showMenuBurger?: boolean;
  showCloseButton?: boolean;
  preSubTitle?: string; // Text above the sub title
  subTitle?: string; // Smaller Sub title
  postSubTitle?: string; // Text after the sub title
  title?: string; // The main Title text
  postTitle?: string; // Text after the main title
  message?: string; // Optional message to show under the header.
  // Message is Included here to ensure it sits within the same background element
  titleSize?: 'normal' | 'big' | 'very-big';  // Title text size
  topPadding?: 'none' | 'small' | 'medium' | 'large'; // Padding at the top
  background?: 'none' | 'transparent-white' | 'white'; // Background colour
}

const ScreenHeader: React.FC<Props> = (props: Props) => {

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [privacyIsOpen, setPrivacyIsOpen] = useState(false);
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [feedbackIsOpen, setFeedbackIsOpen] = useState(false);

  // Locals
  const showGradient = props.background === 'white';
  const screenTitleMarginBottom = props.topPadding === 'large' ? 'medium' : 'small';

  // Functions
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
    <ScreenHeaderStyle {...props}>

      {isMenuOpen &&
        <Menu
          openPrivacy={() => { setPrivacyIsOpen(true); }}
          openHelp={() => { setHelpIsOpen(true); }}
          openFeedback={() => { setFeedbackIsOpen(true); }}
          onCloseClick={() => { setIsMenuOpen(false); }}
        />
      }

      {props.showMenuBurger && !isMenuOpen && <MenuBurger onClick={toggleMenu} />}

      {props.showCloseButton && <HeaderCloseButton />}

      <HeaderTexts>

        {props.showLogo && <ScreenLogo />}
        {props.preSubTitle && <ScreenPostTitle>{props.preSubTitle}</ScreenPostTitle>}
        {props.subTitle && <ScreenSubTitle>{props.subTitle}</ScreenSubTitle>}
        {props.postSubTitle && <ScreenPostTitle>{props.postSubTitle}</ScreenPostTitle>}

        {/* support line breaks */}
        {props.title && props.title.split('\n').map((item, key) => {
          return (
            <ScreenTitle
              key={key}
              titleSize={props.titleSize || 'normal'}
              marginBottom={screenTitleMarginBottom}
            >
              {item}
            </ScreenTitle>
          );
        })}

        {props.postTitle && <ScreenPostTitle>{props.postTitle}</ScreenPostTitle>}

      </HeaderTexts>

      {props.message &&
        <HeaderMessage>
          {/* support line breaks */}
          {props.message && props.message.split('\n').map((item, key) => {
            return (
              <HeaderMessageTextResize
                textSize={50}
                key={key}
              >
                {item}
              </HeaderMessageTextResize>
            );
          })}
        </HeaderMessage>
      }

      {showGradient && <Gradient position='bottom' />}

    </ScreenHeaderStyle>

    {/* == Privacy == */}
    {privacyIsOpen &&
      <InformationWindow
        onClose={() => { setPrivacyIsOpen(false); }}
      >
        <h1>Privacy</h1>
        <h2>Sub heading</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum.
        Semper feugiat nibh sed pulvinar proin.</p>

        <p>Pellentesque elit eget gravida cum sociis natoque penatibus. Lacinia quis vel eros
        donec ac odio tempor. Tristique senectus et netus et malesuada fames ac turpis egestas.
        Et netus et malesuada fames ac turpis egestas integer eget. In massa tempor nec feugiat
        nisl pretium fusce id. Ut sem viverra aliquet eget sit. Vestibulum rhoncus est pellentesque
        elit ullamcorper dignissim. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
        Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Leo a diam sollicitudin
        tempor id eu nisl nunc.</p>

        <p>Pellentesque elit eget gravida cum sociis natoque penatibus. Lacinia quis vel eros
        donec ac odio tempor. Tristique senectus et netus et malesuada fames ac turpis egestas.
        Et netus et malesuada fames ac turpis egestas integer eget. In massa tempor nec feugiat
        nisl pretium fusce id. Ut sem viverra aliquet eget sit. Vestibulum rhoncus est pellentesque
        elit ullamcorper dignissim. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
        Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Leo a diam sollicitudin
        tempor id eu nisl nunc.</p>

        <p>Pellentesque elit eget gravida cum sociis natoque penatibus. Lacinia quis vel eros
        donec ac odio tempor. Tristique senectus et netus et malesuada fames ac turpis egestas.
        Et netus et malesuada fames ac turpis egestas integer eget. In massa tempor nec feugiat
        nisl pretium fusce id. Ut sem viverra aliquet eget sit. Vestibulum rhoncus est pellentesque
        elit ullamcorper dignissim. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
        Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Leo a diam sollicitudin
        tempor id eu nisl nunc.</p>

        <p>Pellentesque elit eget gravida cum sociis natoque penatibus. Lacinia quis vel eros
        donec ac odio tempor. Tristique senectus et netus et malesuada fames ac turpis egestas.
        Et netus et malesuada fames ac turpis egestas integer eget. In massa tempor nec feugiat
        nisl pretium fusce id. Ut sem viverra aliquet eget sit. Vestibulum rhoncus est pellentesque
        elit ullamcorper dignissim. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
        Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Leo a diam sollicitudin
        tempor id eu nisl nunc.</p>
      </InformationWindow>
    }

    {/* == Help == */}
    {helpIsOpen &&
      <InformationWindow
        onClose={() => { setHelpIsOpen(false); }}
      >
        <h1>Help</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Sollicitudin tempor id eu nisl nunc mi ipsum.
        Semper feugiat nibh sed pulvinar proin.</p>

        <p>Pellentesque elit eget gravida cum sociis natoque penatibus. Lacinia quis vel eros
        donec ac odio tempor. Tristique senectus et netus et malesuada fames ac turpis egestas.
        Et netus et malesuada fames ac turpis egestas integer eget. In massa tempor nec feugiat
        nisl pretium fusce id. Ut sem viverra aliquet eget sit. Vestibulum rhoncus est pellentesque
        elit ullamcorper dignissim. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
        Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Leo a diam sollicitudin
        tempor id eu nisl nunc.</p>

        <p>Pellentesque elit eget gravida cum sociis natoque penatibus. Lacinia quis vel eros
        donec ac odio tempor. Tristique senectus et netus et malesuada fames ac turpis egestas.
        Et netus et malesuada fames ac turpis egestas integer eget. In massa tempor nec feugiat
        nisl pretium fusce id. Ut sem viverra aliquet eget sit. Vestibulum rhoncus est pellentesque
        elit ullamcorper dignissim. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
        Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Leo a diam sollicitudin
        tempor id eu nisl nunc.</p>

        <p>Pellentesque elit eget gravida cum sociis natoque penatibus. Lacinia quis vel eros
        donec ac odio tempor. Tristique senectus et netus et malesuada fames ac turpis egestas.
        Et netus et malesuada fames ac turpis egestas integer eget. In massa tempor nec feugiat
        nisl pretium fusce id. Ut sem viverra aliquet eget sit. Vestibulum rhoncus est pellentesque
        elit ullamcorper dignissim. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
        Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Leo a diam sollicitudin
        tempor id eu nisl nunc.</p>

        <p>Pellentesque elit eget gravida cum sociis natoque penatibus. Lacinia quis vel eros
        donec ac odio tempor. Tristique senectus et netus et malesuada fames ac turpis egestas.
        Et netus et malesuada fames ac turpis egestas integer eget. In massa tempor nec feugiat
        nisl pretium fusce id. Ut sem viverra aliquet eget sit. Vestibulum rhoncus est pellentesque
        elit ullamcorper dignissim. Sollicitudin aliquam ultrices sagittis orci a scelerisque purus.
        Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Leo a diam sollicitudin
        tempor id eu nisl nunc.</p>
      </InformationWindow>
    }

    {/* == Feedback == */}
    {feedbackIsOpen &&
      <InformationWindow
        onClose={() => { setFeedbackIsOpen(false); }}
      >
        <h1>Feedback</h1>
        <p>Some notes on leaving feedback.</p>
      </InformationWindow>
    }

    </>
  );
};

ScreenHeader.defaultProps = {
  showMenuBurger: true,
  showCloseButton: false,
};


export {
  ScreenHeader,
};
