import React from 'react';
import styled from 'styled-components';

interface Props {
  backgroundImageUrl?: string;
}

// Arranges the elements on the screen, using flex
const ScreenManagerStyle = styled.div<Props>`
  height: 100vh; /* Fallback for browsers that do not support Custom Properties */
  height: calc(var(--vh, 1vh) * 100); // Set in JS
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  background-image: url(${(props) => props.backgroundImageUrl ? props.backgroundImageUrl : ''});
  background-position: center;
  background-size: cover;
`;

const ScreenManager: React.FC<Props> = (props) => {
  return (
    <ScreenManagerStyle {...props}>
      {props.children}
    </ScreenManagerStyle>
  );
};

// todo: ideally we would hide the chrome
// Fix the vh screen height issue
// Browsers do not consider the browser chrome when calculating viewport height
// We need to calculate out own to ensure our enstire screen is shown
function setupScreenHeight() {
  // Calculate the actual height of the window
  const vh = window.innerHeight * 0.01;
  // Set the css variable
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

// Hookup the resize event to recalc our values
window.addEventListener('resize', () => {
  setupScreenHeight();
});

// Fire when fully loaded
window.addEventListener('load', () => {
  setupScreenHeight();
});

export {
  ScreenManager,
};
