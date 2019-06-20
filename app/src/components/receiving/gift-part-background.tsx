import styled from 'styled-components';

import { GiftPart } from '../../domain';

/***
 * Applies a gift part photo as a background
 * This is done as a seperate :before layer as the blur effects needs to be seperate from the content
 */
interface Props {
  giftPart: GiftPart;
}

const GiftPartBackground = styled.div<Props>`
  width: 100%;
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.giftPart.photo});
    background-position: center;
    background-size: cover;
    z-index: -1;
    filter: blur(5px);
    opacity: 0.8;
  }
`;

export {
  GiftPartBackground,
};
