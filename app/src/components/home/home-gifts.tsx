import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { BgSvgFullScreen } from '../svg/bg';
import { GiftPile } from '../gift-pile';
import { Gift } from '../../domain';
import { PanelTitle } from '../panel-title';
import { global } from '../../themes/global';
import { TextResize } from '../text-resize';
import SvgAddCircle from '../svg/add-circle';

import uuidv5 from 'uuid/v5';

const PlusStyle = styled.div`
  margin: 0 auto 0;
  width: 20%;
  cursor: pointer;
`;

const GiftsNotSent = styled.div`
  text-align: center;
  margin: 4vh auto 4vh;
  div {
    line-height: 1.3;
  }
`;

const LineSpacer = styled.div`
  margin: 3vh 0 5vh 0;
  border-bottom: 0.4vh dashed ${global.colour.veryLightGrey};
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const ContentBg = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-color: rgba(255,255,255,0.4);
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

  const sentGiftCount = 0;
  const hasSentGifts = sentGiftCount > 0;

  return (

    <ScreenManager>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      <ScreenHeader
        background='white'
        subTitle={`Your gifts`}
      />

      <ContentBg>
        <Content>

          <PanelTitle textSize={50}>Gifts you've been given...</PanelTitle>
          <GiftPile
            gifts={giftsIn}
          />

          <LineSpacer />

          <PanelTitle textSize={50}>Gifts you've sent...</PanelTitle>

          {hasSentGifts &&
            <GiftPile
              gifts={giftsIn}
            />
          }
          {!hasSentGifts &&
            <GiftsNotSent>
              <TextResize textSize={60}>
                You've not sent any gifts<br/>
                Make one now?
              </TextResize>
              <PlusStyle>
                <Link to='/create-gift'>
                  <SvgAddCircle />
                </Link>
              </PlusStyle>
            </GiftsNotSent>
          }

        </Content>
      </ContentBg>

    </ScreenManager>
  );

};

export {
  HomeGifts,
};
