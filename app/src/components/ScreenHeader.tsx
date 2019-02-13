import React from 'react';

import ScreenTitle from './ScreenTitle';
import ScreenSubTitle from './ScreenSubTitle';
import ScreenLogo from './ScreenLogo';
import { Gift } from '../domain';

interface ScreenHeaderProps {
  gift: Gift;
  title: string;
}

const ScreenHeader: React.FC<ScreenHeaderProps> = ({ gift, title }: ScreenHeaderProps) => (
  <div>
    <ScreenLogo />
    <ScreenTitle>Gift from {gift.senderName}</ScreenTitle>
    <ScreenSubTitle>{title}</ScreenSubTitle>
  </div>
);

export default ScreenHeader;
