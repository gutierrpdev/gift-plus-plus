import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';

/***
 * Provides the sneak peak reveal
 */

interface GiftPartImageRevealProps {
  imageUrl: string;
}
const GiftPartImageRevealStyle = styled.div<GiftPartImageRevealProps>`
// top: 0;
// left: 0;
  height: 100%;
  width: 100%;
  // height: ${global.components.circle.width};
  // width: ${global.components.circle.width};

  background-image: url(${(props) => props.imageUrl ? props.imageUrl : ''});
  background-position: center;
  background-size: cover;
  overflow: hidden;
  // border: -10px solid transparent;
  // border-radius: 50%;
  position: absolute;
  // top: 50%;
  // left: 50%;
  // transform: translate(-50%, -50%);
  // padding: 100px;
  box-sizing: border-box;
  // display: none;
  border: 1px solid yellow;
  &:after {
    border: 5px solid blue;
    content: '';
    height: ${global.components.circle.width};
    width: ${global.components.circle.width};
    z-index: 4;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

// const GiftPartImageRevealStyleInner = styled.div<GiftPartImageRevealProps>`
// background-image: url(${(props) => props.imageUrl ? props.imageUrl : ''});
// background-position: center;
// background-attachment: fixed;
// background-size: cover;
// position: absolute;
//   height: ${global.components.circle.width};
//   width: ${global.components.circle.width};
//   border-radius: 50%;
//   z-index: 1;
//   border: 1px solid red;
//   overflow: hidden;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);

// `;

const GiftPartImageReveal: React.FC<GiftPartImageRevealProps> = (props: GiftPartImageRevealProps) => (
  <GiftPartImageRevealStyle {...props}>
    {/* <GiftPartImageRevealStyleInner  {...props} /> */}
  </GiftPartImageRevealStyle>
);

export {
  GiftPartImageReveal,
};
