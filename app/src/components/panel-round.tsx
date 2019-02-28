import styled from 'styled-components';
import { global } from '../themes/global';

export interface Props {
  dottedBorder: boolean;
  darkBackground: boolean;
}

const PanelRound = styled.div<Props>`
  height: ${global.components.circle.width};
  width: ${global.components.circle.width};
  border-radius: 50%;
  padding: 3vmin;
  margin: 0 auto;
  display: flex;

  ${(props: Props) =>
    props.dottedBorder === true && `
      border: 2px dashed white;
  `}

  ${(props: Props) =>
    props.darkBackground === true && `
    background-color: rgba(0, 0, 0, 0.5);
  `}

`;

export {
  PanelRound,
};
