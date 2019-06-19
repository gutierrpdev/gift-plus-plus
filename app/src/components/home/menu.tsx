import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { global } from '../../themes/global';
import { TextResize } from '../text-resize';
import SvgArrowUp from '../svg/arrow-up';

/***
 * Global menu
 */

// Burger bars
const MenuBurgerBar = styled.div`
  height: 3px;
  margin-bottom: 20%;
  background-color: rgba(0,0,0,0.3);
  border-radius: 25px;
`;

// Burger menu
const MenuBurgerStyle = styled.button`
  width: 8%;
  position: absolute;
  top: 3.3vh;
  left: 5%;
  cursor: pointer;
  border: none;
  padding: 0;
`;

interface MenuBurgerProps {
  onClick: () => void;  // Callback when the menu burger is clicked
}

const MenuBurger: React.FC<MenuBurgerProps> = ({onClick}) => (
  <MenuBurgerStyle onClick={onClick} aria-label='menu'>
    <MenuBurgerBar />
    <MenuBurgerBar />
    <MenuBurgerBar />
  </MenuBurgerStyle>
);

// Menu item
const MenuItemStyle = styled.button`
  padding: 6% 0;
  cursor: pointer;
  color: ${global.colour.lightGreyText};
  display: block;
  width: 100%;
  border: none;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.bold};
  &:not(:last-child) {
    border-bottom: 0.1vh solid ${global.colour.veryLightGrey};
  }
`;

// Close menu MenuItem
const CloseMenuItem = styled.button`
  padding: 3% 0;
  display: block;
  width: 100%;
  border: none;
  opacity: 0.5;
`;

const CloseArrowUp = styled(SvgArrowUp)`
  max-width: 8%;
`;

interface MenuItemProps {
  onClick?: () => void; // Callback when the menu item is clicked
}

const MenuItem: React.FC<MenuItemProps> = (props) => (
  <MenuItemStyle onClick={props.onClick}>
    <TextResize textSize={80}>
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
  onCloseClick: () => void; // Callback when the close button is clicked
}

const Menu: React.FC<MenuProps> = (props) => (
  <MenuStyle>
    <MenuItem><Link onClick={props.onCloseClick} to='/'>Home</Link></MenuItem>
    <MenuItem onClick={props.openHelp}>Help</MenuItem>
    <MenuItem onClick={props.openPrivacy}>Privacy</MenuItem>
    <MenuItem><a href='https://www.surveymonkey.co.uk/r/S3FPSJB' target='_blank'>Feedback</a></MenuItem>
    <CloseMenuItem onClick={props.onCloseClick} aria-label='close menu'><CloseArrowUp /></CloseMenuItem>
  </MenuStyle>
);

export {
  Menu,
  MenuBurger,
};
