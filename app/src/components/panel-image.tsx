import React from 'react';
import styled from 'styled-components';

import { PanelRound } from './panel-round';

const PanelPromptStyle = styled.div`
  overflow: hidden;
  color: white;
  margin: 0 auto;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  imageSrc: string;
}

const PanelImage: React.FC<Props> = ({ imageSrc }: Props) => (
  <PanelRound darkBackground={true} dottedBorder={false}>
    <PanelPromptStyle>
      <img src={imageSrc} />
    </PanelPromptStyle>
  </PanelRound>
);

export {
  PanelImage,
};
