import styled from 'styled-components';
import { global } from '../themes/global';

/***
 * Consitent round shape
 */

export type PanelRoundBackgroundStyle = 'transparent-black' | 'solid-white' | 'none';

export interface Props {
  dottedBorder: boolean;
  background: PanelRoundBackgroundStyle;
}

const PanelRound = styled.div<Props>`
  height: ${global.components.circle.width};
  width: ${global.components.circle.width};
  border-radius: 50%;
  padding: 3vmin;
  margin: 0 auto;
  display: flex;
  // align-items: center;
  // flex-direction: column;

  ${(props: Props) =>
    props.dottedBorder === true && `
      border: 2px dashed white;
  `}

  ${(props: Props) =>
    props.background === 'transparent-black' && `
    background-color: rgba(0, 0, 0, 0.5);
  `}

  ${(props: Props) =>
    props.background === 'solid-white' && `
    background-color: rgba(255, 255, 255, 1);
  `}


`;

export {
  PanelRound,
};
