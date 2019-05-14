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
  color: ${global.colour.lightGreyText};
  &:not(:last-child) {
    border-bottom: 0.1vh solid ${global.colour.veryLightGrey};
  }
`;

// Close menu MenuItem
const CloseMenuItem = styled.div`
  padding: 3% 0;
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
  openFeedback: () => void; // Callback to open feedback
  onCloseClick: () => void; // Callback when the close button is clicked
}

// Link 'Home' to / (and not /home) so that any new visitors to the app will get the intro experience
const Menu: React.FC<MenuProps> = (props) => (
  <MenuStyle>
    <MenuItem><Link to='/'>Home</Link></MenuItem>
    <MenuItem onClick={props.openHelp}>Help</MenuItem>
    <MenuItem onClick={props.openPrivacy}>Privacy</MenuItem>
    <MenuItem onClick={props.openFeedback}>Feedback</MenuItem>
    <CloseMenuItem onClick={props.onCloseClick}><CloseArrowUp /></CloseMenuItem>
  </MenuStyle>
);

export {
  Menu,
  MenuBurger,
};
