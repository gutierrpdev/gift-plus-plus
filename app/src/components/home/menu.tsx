import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { global } from '../../themes/global';
import { TextResize } from '../text-resize';

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

export {
  Menu,
  MenuBurger,
};
