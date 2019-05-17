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
import { TextResize } from '../text-resize';
import SvgAddCircle from '../svg/add-circle';
import SvgGift from '../svg/gift';

import uuidv5 from 'uuid/v5';

const OpenMuseumGift = styled.div`
  text-align: center;
`;
const OpenMuseumGiftSvg = styled.div`
  margin: 2% auto 0;
  width: 20%;
`;
const OpenYourGift = styled.div`
  line-height: 1.3;
  margin-bottom: 5%;
`;

const PlusStyle = styled.div`
  margin: 2% auto 0;
  width: 20%;
  cursor: pointer;
`;

const GiftsNotSent = styled.div`
  text-align: center;
  margin: 4% auto 5%; // Extra spacing at the end to avoid clash with brower chrome
  div {
    line-height: 1.3;
  }
`;

const LineSpacer = styled.div`
  margin: 2% 0 3% 0;
  border-bottom: 0.1vh solid rgba(0,0,0,0.5);
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 3%;
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

  const gift1Part = {...emptyGift,
    id: '/gift/cdfc5287-9d03-5c70-94f1-755d4480bfac',
    senderName: '1 Part Personal Gift',
  };
  const gift2Part = {...emptyGift,
    id: '/gift/2e73df73-4faf-5c0a-abaa-c3717fd3ef7c',
    senderName: '2 Part Museum Gift',
  };
  const gift3Part = {...emptyGift,
    id: '/gift/5475400c-684c-515f-8343-b9d14340de9c',
    senderName: '3 Part Personal Gift',
  };

  giftsIn.push(
    gift3Part,
    gift2Part,
    gift1Part,
  );

  const sentGiftCount = 0;
  const hasSentGifts = sentGiftCount > 0;
  const museumName = 'Brighton Museum'; // todo: get from entry URL

  return (

    <ScreenManager allowScroll={false}>
      <BgSvgFullScreen />
      <GlobalStyles />

      {/* Header */}
      <ScreenHeader
        background='transparent-white'
        topPadding={'small'}
        title={`Gift`}
        postTitle={`at ${museumName}`}
        titleSize={'big'}
        message='Think of someone special
          and create a playlist for them
          from objects around the
          museum'
        museumName={museumName}
      />

      <ContentBg>
        <Content>

          {/* TEMP REMOVE
          <PanelTitle textSize={50}>Gifts you've been given...</PanelTitle>
          <GiftPile
            gifts={giftsIn}
          />*/}

          <OpenMuseumGift>
            <PanelTitle textSize={50}>If you're at the museum now...</PanelTitle>

            <Link to='/gift/2e73df73-4faf-5c0a-abaa-c3717fd3ef7c'> {/* todo: real url */}

              <OpenMuseumGiftSvg>
                <SvgGift colour='black' />
              </OpenMuseumGiftSvg>
              <OpenYourGift>
                <TextResize>Open your gift from</TextResize>
                <TextResize>{museumName}</TextResize>
              </OpenYourGift>

            </Link>

          </OpenMuseumGift>

          <LineSpacer />

          {/* <PanelTitle textSize={50}>Gifts you've sent...</PanelTitle> */}

          {hasSentGifts &&
            <GiftPile
              gifts={giftsIn}
            />
          }
          {!hasSentGifts &&
            <GiftsNotSent>
              {/* <TextResize textSize={50}>
                You've not sent any gifts<br/>
                Make one now?
              </TextResize> */}
              <TextResize textSize={50}>
                Create a new gift of<br/>
                your own
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
