import React from 'react';
import styled from 'styled-components';

import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { BgSvgFullScreen } from '../svg/bg';
import { GiftPile } from '../gift-pile';
import { Gift } from '../../domain';
import { PanelTitle } from '../panel-title';
import uuidv5 from 'uuid/v5';

const Content = styled.div`
  position: relative;;
`;

/**
 * Home screen gifts top level component
 */

const HomeGifts: React.FC = () => {

  // todo get from API
  const giftsIn: Gift[] = [];

  const emptyGift: Gift = {
    id: uuidv5('https://api.gift.com/gift/test', uuidv5.URL),
    kind: 'PersonalGift',
    museumId: uuidv5('https://api.gift.com/museum/test', uuidv5.URL),
    accountId: uuidv5('https://api.gift.com/account/test', uuidv5.URL),
    senderName: 'Christopher',
    recipientName: '',
    recipientGreeting: '',
    parts: [],
  };

  giftsIn.push(
    emptyGift,
    emptyGift,
    emptyGift,
  );

  return (

    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      <ScreenHeader
        background='white'
        subTitle={`Your gifts`}
      />

      <Content>

        <PanelTitle textSize={20}>Gifts you've been given...</PanelTitle>
        <GiftPile
          gifts={giftsIn}
        />
      </Content>

    </ScreenManager>
  );

};

export {
  HomeGifts,
};
