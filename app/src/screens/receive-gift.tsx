import React from 'react';
import { Gift } from '../domain';
import { GlobalStyles, NoScroll } from '../themes/global';
import { ScreenManager } from '../components/screen-manager';
import { ScreenHeader } from '../components/screen-header';
import { GiftPartsManager } from '../components/gift-parts-manager';

interface Props {
  gift: Gift;
  museumName: string;
}

export const ReceiveGift: React.FC<Props> = ({ gift, museumName }: Props) => (
  <ScreenManager>
    <GlobalStyles />
    <NoScroll />

    <ScreenHeader gift={gift} title={museumName} />

    <GiftPartsManager gift={gift} />
  </ScreenManager>
);
