import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { global } from '../themes/global';
import { TextResize } from './text-resize';
import { ScreenTitle } from './screen-title';
import { ScreenSubTitle } from './screen-sub-title';
import { ScreenPostTitle } from './screen-post-title';
import { ScreenLogo } from './screen-logo';
import { InfoPopover } from './info-popover';
import { Gradient } from './gradient';
import SvgCloseCircle from './svg/close-circle';
import SvgClose from './svg/close';

// Close
const SvgCloseStyled = styled(SvgClose)`
  width: 10%;
  top: 1.3vh;
  left: 0.8%;
  position: absolute;
  cursor: pointer;
  z-index: 500;
`;

// Close circle
const SvgCloseCircleStyled = styled(SvgCloseCircle)`
  width: 8%;
  top: 2.5%;
  right: 2%;
  position: absolute;
  cursor: pointer;
`;

// Burger bars
const MenuBurgerBar = styled.div`
  height: 3px;
  margin-bottom: 16%;
  background-color: black;
  border-radius: 25px;
`;

// Burger menu
const MenuBurgerStyle = styled.div`
  width: 6%;
  position: absolute;
  top: 3vh;
  left: 3%;
  cursor: pointer;
`;
interface MenuBurgerProps {
  onClick: () => void;  // Callback when the menu burger is clicked
}
const MenuBurger: React.FC<MenuBurgerProps> = ({onClick}) => (
  <MenuBurgerStyle onClick={onClick}>
    <MenuBurgerBar />
    <MenuBurgerBar />
    <MenuBurgerBar />
  </MenuBurgerStyle>
);

// Menu item
const MenuItemStyle = styled.div`
  line-height: 4;
  padding: 6% 0;
  cursor: pointer;
  &:not(:last-child) {
    border-bottom: 0.4vh dashed ${global.colour.veryLightGrey};
  }
`;
interface MenuItemProps {
  onClick?: () => void; // Callback when the menu item is clicked
}
const MenuItem: React.FC<MenuItemProps> = (props) => (
  <MenuItemStyle onClick={props.onClick}>
    <TextResize textSize={60}>
      {props.children}
    </TextResize>
  </MenuItemStyle>
);


// Menu
const MenuStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  text-align: center;
  z-index: 20;
`;
interface MenuProps {
  openPrivacy: () => void; // Callback to open privacy
  openHelp: () => void; // Callback to open help
  openFeedback: () => void; // Callback to open feedback
  openSignIn: () => void; // Callback to open SignIn
}
const Menu: React.FC<MenuProps> = (props) => (
  <MenuStyle>
    <MenuItem><Link to='/your-gifts'>Your gifts</Link></MenuItem>
    <MenuItem onClick={props.openHelp}>Help</MenuItem>
    <MenuItem onClick={props.openSignIn}>Sign-in</MenuItem>
    <MenuItem onClick={props.openPrivacy}>Privacy</MenuItem>
    <MenuItem onClick={props.openFeedback}>Feedback</MenuItem>
  </MenuStyle>
);

// Texts wrapper
const HeaderTexts = styled.div`
  width: 80%;
  position: relative;
  left: 10%;
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
    padding-top: 10%;
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
  titleSize?: 'normal' | 'very-big';  // Title text size
  topPadding?: 'none' | 'small' | 'medium' | 'large'; // Padding at the top
  background?: 'none' | 'white'; // Background colour
}

const ScreenHeader: React.FC<Props> = (props: Props) => {

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [privacyIsOpen, setPrivacyIsOpen] = useState(false);
  const [helpIsOpen, setHelpIsOpen] = useState(false);
  const [feedbackIsOpen, setFeedbackIsOpen] = useState(false);
  const [signInIsOpen, setSignInIsOpen] = useState(false);

  // Functions
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  // Locals
  const showGradient = props.background === 'white';
  const screenTitleMarginBottom = props.topPadding === 'large' ? 'medium' : 'small';

  return (
    <>
    <ScreenHeaderStyle {...props}>

      {isMenuOpen &&
        <Menu
          openPrivacy={() => { setPrivacyIsOpen(true); }}
          openHelp={() => { setHelpIsOpen(true); }}
          openFeedback={() => { setFeedbackIsOpen(true); }}
          openSignIn={() => { setSignInIsOpen(true); }}
        />
      }

      {props.showMenuBurger && !isMenuOpen && <MenuBurger onClick={toggleMenu} />}
      {isMenuOpen && <SvgCloseStyled onClick={toggleMenu} />}
      {/* {props.showCloseButton || true && <SvgCloseCircleStyled />} */}

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

      {showGradient && <Gradient position='bottom' />}

    </ScreenHeaderStyle>

    {/* == Privacy == */}
    {privacyIsOpen &&
      <InfoPopover
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
      </InfoPopover>
    }

    {/* == Help == */}
    {helpIsOpen &&
      <InfoPopover
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
      </InfoPopover>
    }

    {/* == Feedback == */}
    {feedbackIsOpen &&
      <InfoPopover
        onClose={() => { setFeedbackIsOpen(false); }}
      >
        <h1>Feedback</h1>
        <p>Some notes on leaving feedback.</p>
      </InfoPopover>
    }


    {/* == SignIn == */}
    {signInIsOpen &&
      <InfoPopover
        onClose={() => { setSignInIsOpen(false); }}
      >
        <h1>Signin</h1>
        <p>Some notes on leaving feedback.</p>
      </InfoPopover>
    }


    </>
  );
};

ScreenHeader.defaultProps = {
  showMenuBurger: true,
};

export {
  ScreenHeader,
};
