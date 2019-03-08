import styled from 'styled-components';

import { GiftPart } from '../../domain';

/***
 * Applies a gift part photo as a background
 */
interface Props {
  giftPart: GiftPart;
}

const GiftPartBackground = styled.div<Props>`
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100%;
  // height: 100%;
  width: 100%;
  // text-align: center;
  // Background image as :before to apply blur
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.giftPart && props.giftPart.photo ? props.giftPart.photo : ''});
    background-position: center;
    background-size: cover;
    z-index: -1;
    filter: blur(5px);
    border: 1px solid red;
  }
`;

export {
  GiftPartBackground,
};
