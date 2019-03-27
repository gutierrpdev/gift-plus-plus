import React from 'react';
import styled from 'styled-components';

import { PanelPrompt } from './panel-prompt';

/***
 * Panel prompt with plus sign
 */

interface Props {
  text: string;
  onClick: () => void;
}

const PlusStyle = styled.img`
  margin-top: 5%;
  max-width: 40%;
  cursor: pointer;
`;

const PanelPlus: React.FC<Props> = ({ text, onClick }: Props) => (
  <PanelPrompt text={text} background={'transparent-black'}>
    <PlusStyle src={require('../assets/svg/add-circle.svg')} onClick={onClick} />
  </PanelPrompt>
);

export {
  PanelPlus,
};
