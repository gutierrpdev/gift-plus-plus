import styled from 'styled-components';
import { global } from '../themes/global';

/***
 * Consitent round shape
 */

export type PanelRoundBackgroundStyle = 'transparent-black' | 'solid-white' | 'none';
export type PanelRoundBorderStyle = 'dotted' | 'solid-red' | 'none';

export interface Props {
  border?: PanelRoundBorderStyle; // default = 'none'
  background: PanelRoundBackgroundStyle;
}


const PanelRound = styled.div<Props>`
  height: ${global.components.circle.width.vm};
  width: ${global.components.circle.width.vm};
  @media (min-width: ${global.desktop.startPixels}px) {
    height: ${global.components.circle.width.pixels};
    width: ${global.components.circle.width.pixels};
  }
  border-radius: 50%;
  border-width: 2vw;
  @media (min-width: ${global.desktop.startPixels}) {
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
    props.border === 'dotted' && `
      border: dashed white;`
  }

  ${(props: Props) =>
    props.border === 'solid-red' && `
    border: solid ${global.colour.red};`
  }

  ${(props: Props) =>
    props.background === 'transparent-black' && `
    background-color: rgba(0, 0, 0, 0.5);
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
