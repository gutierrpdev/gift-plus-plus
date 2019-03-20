import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';

/***
 * Provides the sneak peak reveal
 */
interface PanelImageRevealProps {
  imageUrl: string;
}
const PanelImageRevealStyle = styled.div<PanelImageRevealProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: url(${(props) => props.imageUrl ? props.imageUrl : ''});
  background-position: center;
  background-size: cover;
  // Possible MS Edge issue with clip path, check for Polyfill alternative
  clip-path: circle(${(global.components.imageReveal.width)} at center);
  z-index: -1;
`;

const PanelImageReveal: React.FC<PanelImageRevealProps> = (props: PanelImageRevealProps) => (
  <PanelImageRevealStyle {...props} />
);

export {
  PanelImageReveal,
};
