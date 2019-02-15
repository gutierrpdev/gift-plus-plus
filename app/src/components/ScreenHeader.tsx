import React from 'react';

import { ScreenTitle } from './screenTitle';
import { ScreenSubTitle } from './screenSubTitle';
import { ScreenLogo } from './screenLogo';
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

export {
  ScreenHeader,
};
