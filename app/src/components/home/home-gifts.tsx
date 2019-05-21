import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { config } from '../../config';
import { Panel, PanelContent } from '../panel';
// import { GiftPile } from '../gift-pile';
import { PanelTitle } from '../panel-title';
import { TextResize } from '../text-resize';
import SvgAddCircle from '../svg/add-circle';
import SvgGift from '../svg/gift';

/**
 * The gift home screen
 * Shows welcome message, gift pile, and create a gift
 */

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

/**
 * Home screen gifts top level component
 */

interface HomeGiftProps {
  museumName: string;
}

const HomeGifts: React.FC<HomeGiftProps> = ({ museumName }) => {

  // const sentGiftCount = 0;
  // const hasSentGifts = sentGiftCount > 0;
  const hasSentGifts = false;

  return (

    <Panel>
      <PanelContent>

        {/* TEMP REMOVE
        <PanelTitle textSize={50}>Gifts you've been given...</PanelTitle>
        <GiftPile
          gifts={giftsIn}
        />*/}

        <OpenMuseumGift>
          <PanelTitle textSize={50}>If you're at the museum now...</PanelTitle>

          <Link to={`/gift/${config.curatedMuseumGiftId}`}>

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

        {/* {hasSentGifts &&
          <GiftPile
            gifts={giftsIn}
          />
        } */}
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

      </PanelContent>
    </Panel>

  );

};

export {
  HomeGifts,
};
