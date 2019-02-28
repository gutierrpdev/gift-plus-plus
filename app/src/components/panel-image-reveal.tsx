import React from 'react';
import styled from 'styled-components';

// import { global } from '../themes/global';

/***
 * Provides the sneak peak reveal
 */

interface GiftPartImageRevealProps {
  imageUrl: string;
}
const GiftPartImageRevealStyle = styled.div<GiftPartImageRevealProps>`
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.imageUrl ? props.imageUrl : ''});
  background-position: center;
  background-size: cover;
  overflow: hidden;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  // padding: 100px;
  // box-sizing: border-box;
`;

const GiftPartImageReveal: React.FC<GiftPartImageRevealProps> = (props: GiftPartImageRevealProps) => (
  <GiftPartImageRevealStyle {...props} />
);

export {
  GiftPartImageReveal,
};
