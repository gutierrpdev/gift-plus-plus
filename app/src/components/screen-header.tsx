import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { global } from '../themes/global';
import { TextResize } from './text-resize';
import { ScreenTitle } from './screen-title';
import { ScreenSubTitle } from './screen-sub-title';
import { ScreenPostTitle } from './screen-post-title';
import { ScreenLogo } from './screen-logo';
import SvgCloseCircle from './svg/close-circle';
import SvgClose from './svg/close';

// Close
const SvgCloseStyled = styled(SvgClose)`
  width: 10%;
  top: 1.0%;
  left: 0.9%;
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
  top: 3%;
  left: 3%;
  cursor: pointer;
`;
interface MenuBurgerProps {
  onClick: () => void;
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
  &:not(:last-child) {
    border-bottom: 0.4vh dashed ${global.colour.veryLightGrey};
  }
`;
const MenuItem: React.FC = (props) => (
  <MenuItemStyle>
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
  z-index: 1;
`;
const Menu: React.FC = () => (
  <MenuStyle>
    <MenuItem><Link to='/my-gifts'>Your gifts</Link></MenuItem>
    <MenuItem><Link to='/help'>Help</Link></MenuItem>
    <MenuItem><Link to='/sign-in'>Sign-in</Link></MenuItem>
    <MenuItem><Link to='/privacy'>Privacy</Link></MenuItem>
    <MenuItem><Link to='/feedback'>Feedback</Link></MenuItem>
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
  padding: 5% 2%;
  border: 1px solid green;
  z-index: 2000; // high to aid the menu
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
  ${(props) => props.background === 'white' && `
    background-color: white;
  `}
`;

interface Props {
  showLogo?: boolean;
  showMenuBurger?: boolean;
  showCloseButton?: boolean;
  preSubTitle?: string;
  subTitle?: string;
  postSubTitle?: string;
  title?: string;
  titleSize?: 'normal' | 'very-big';
  postTitle?: string;
  topPadding?: 'none' | 'small' | 'medium';
  background?: 'none' | 'white';
}

const ScreenHeader: React.FC<Props> = (props: Props) => {

  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Functions
  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <ScreenHeaderStyle {...props}>

      {isMenuOpen && <Menu />}

      {props.showMenuBurger || true && !isMenuOpen && <MenuBurger onClick={toggleMenu} />}
      {isMenuOpen && <SvgCloseStyled onClick={toggleMenu} />}
      {props.showCloseButton || true && <SvgCloseCircleStyled />}

      <HeaderTexts>

        {props.showLogo && <ScreenLogo />}
        {props.preSubTitle && <ScreenPostTitle>{props.preSubTitle}</ScreenPostTitle>}
        {props.subTitle && <ScreenSubTitle>{props.subTitle}</ScreenSubTitle>}
        {props.postSubTitle && <ScreenPostTitle>{props.postSubTitle}</ScreenPostTitle>}

        {/* support line breaks */}
        {props.title && props.title.split('\n').map((item, key) => {
          return <ScreenTitle key={key} titleSize={props.titleSize || 'normal'}>{item}</ScreenTitle>;
        })}

        {props.postTitle && <ScreenPostTitle>{props.postTitle}</ScreenPostTitle>}

      </HeaderTexts>

    </ScreenHeaderStyle>
  );
};

export {
  ScreenHeader,
};
