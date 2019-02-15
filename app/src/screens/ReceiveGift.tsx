import React from 'react';
import { Gift } from '../domain';
import { GlobalStyles, NoScroll } from '../themes/global';
import {ScreenManager } from '../components/screenManager';
import { ScreenHeader } from '../components/screenHeader';
import { GiftPartsManager } from '../components/giftPartsManager';

interface Props {
  gift: Gift;
  museumName: string;
}

const ReceiveGift: React.FC<Props> = ({ gift, museumName }: Props) => (
  <ScreenManager>
    <GlobalStyles />
    <NoScroll />

    <ScreenHeader gift={gift} title={museumName} />

    <GiftPartsManager gift={gift} />
  </ScreenManager>
);

export default ReceiveGift;
