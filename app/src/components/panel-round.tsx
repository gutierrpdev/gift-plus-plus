import styled from 'styled-components';
import { global } from '../themes/global';

/***
 * Consitent round shape
 */

export type PanelRoundBackgroundStyle = 'transparent-black' | 'solid-white' | 'none';
export type PanelRoundBorderStyle = 'dotted-white' | 'solid-red' | 'solid-grey' | 'none';

export interface Props {
  border?: PanelRoundBorderStyle; // default = 'none'
  background: PanelRoundBackgroundStyle;
  allowCompact?: boolean; // allow compact mode
}


const PanelRound = styled.div<Props>`
  height: ${global.components.circle.width.vm};
  width: ${global.components.circle.width.vm};
  /* Target devices with smaller aspect ratio when allowCompact is set */
  ${(props: Props) => props.allowCompact && `
    @media (min-aspect-ratio: ${global.aspectRatio.iPhone5}) {
      height: ${global.components.circle.width.vmCompact};
      width: ${global.components.circle.width.vmCompact};
    }
  `}
  @media (min-width: ${global.desktop.startPixels}px) {
    height: ${global.components.circle.width.pixels};
    width: ${global.components.circle.width.pixels};
  }
  border-radius: 50%;
  border-width: 2vw;
  @media (min-width: ${global.desktop.startPixels}px) {
    border-width: 20px;
  }
  padding: 5%;
  margin: 0 auto;
  display: flex;
  // align-items: center;
  // flex-direction: column;
  z-index: 0;

  ${(props: Props) =>
    props.border === 'none' && `
      border: solid transparent;
      @media (min-width: ${global.desktop.startPixels}px) {
        border: solid transparent;
      }
  `}

  ${(props: Props) =>
    props.border === 'dotted-white' && `
      border: dashed white 0.6vh;
  `}

  ${(props: Props) =>
    props.border === 'solid-red' && `
    border: solid ${global.colour.darkRed};
  `}

  ${(props: Props) =>
    props.border === 'solid-grey' && `
    border: solid ${global.colour.lightGrey};
  `}

  ${(props: Props) =>
    props.background === 'transparent-black' && `
    background-color: rgba(0, 0, 0, 0.7);
  `}

  ${(props: Props) =>
    props.background === 'solid-white' && `
    background-color: rgba(255, 255, 255, 1);
  `}

`;

PanelRound.defaultProps = {
  border: 'none',
};

export {
  PanelRound,
};
