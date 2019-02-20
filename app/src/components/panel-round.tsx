import styled from 'styled-components';
import { global } from '../themes/global';

export interface Props {
  dottedBorder: boolean;
  darkBackground: boolean;
}

const PanelRound = styled.div<Props>`
  border-radius: 50%;
  height: ${global.components.circle.width};
  width: ${global.components.circle.width};

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
