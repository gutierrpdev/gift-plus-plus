import React from 'react';
import styled from 'styled-components/macro';

import ScreenTitle from './ScreenTitle'
import ScreenSubTitle from './ScreenSubTitle'
import { Gift } from '../domain';

interface ScreenHeaderProps {
  gift: Gift;
  title: string,
}

const ScreenHeaderMarkup: React.FC<ScreenHeaderProps> = ({ gift, title }: ScreenHeaderProps) => (
  <div>
    <ScreenTitle>Gift from {gift.senderName}</ScreenTitle>
    <ScreenSubTitle>{title}</ScreenSubTitle>
  </div>
)

const ScreenHeader = styled(ScreenHeaderMarkup)`
`;

export default ScreenHeader;