import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { config } from '../../config';
import { global } from '../../themes/global';
import { Panel, PanelContent } from '../panel';
// import { GiftPile } from '../gift-pile';
import { InformationWindow } from '../modals/information-window';
import { HelpContent } from '../information/help';
import { PanelTitle } from '../panel-title';
import { TextResize } from '../text-resize';
import SvgAddCircle from '../svg/add-circle';
import SvgGift from '../svg/gift';

/**
 * The gift home screen
 * Shows welcome message, gift pile, and create a gift
 */

 // Message
const HeaderMessage = styled.div`
  margin: 3% auto 3%;
  width: 80%;
  text-align: center;
`;

const HeaderMessageTextResize = styled(TextResize)`
line-height: 1.2;
`;

const OpenMuseumGift = styled.div`
  text-align: center;
`;
const OpenMuseumGiftSvg = styled.div`
  margin: 6% auto 1%;
  width: 25%;
`;
const OpenYourGift = styled.div`
  line-height: 1.3;
  margin-bottom: 11%;
`;

const PlusStyle = styled.div`
  margin: 4% auto 0;
  width: 32%;
  cursor: pointer;
`;

const HomeContent = styled(PanelContent)`
  justify-content: flex-start;
`;

const GiftsNotSent = styled.div`
  text-align: center;
  margin: 4% auto 5%; /* Extra spacing at the end to avoid clash with brower chrome */
  div {
    line-height: 1.3;
  }
`;

const LineSpacer = styled.div`
  margin: 2% 0 3% 0;
  border-bottom: 0.1vh solid rgba(0,0,0,0.5);
  width: 100%;
`;

const ReadMoreLink = styled.button`
  margin: 2% 0 0;
  font-style: italic;
  color: ${global.colour.darkGrey};
  border: none;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.normal};
`;

const SectionTitle = styled(PanelTitle)`
  margin-bottom: 10%;
`;

/**
 * Home screen gifts top level component
 */

interface HomeGiftProps {
  museumName: string;
}

const HomeGifts: React.FC<HomeGiftProps> = ({ museumName }) => {

  const [helpIsOpen, setHelpIsOpen] = useState(false);

  // const sentGiftCount = 0;
  // const hasSentGifts = sentGiftCount > 0;
  const hasSentGifts = false;

  return (

    <>
      {helpIsOpen &&
        <InformationWindow
          onClose={() => { setHelpIsOpen(false); }}
        >
          <HelpContent />
        </InformationWindow>
      }

      <Panel>
        <HomeContent>

          <HeaderMessage>
            <HeaderMessageTextResize textSize={42}>
              Think of someone special<br/>
              and create a playlist for them<br/>
              from objects around the museum
            </HeaderMessageTextResize>

            <ReadMoreLink onClick={() => {setHelpIsOpen(true); }}>
              <TextResize textSize={42}>More...</TextResize>
            </ReadMoreLink>
          </HeaderMessage>

          <LineSpacer />

          {/* TEMP REMOVE
          <PanelTitle textSize={50}>Gifts you've been given...</PanelTitle>
          <GiftPile
            gifts={giftsIn}
          />*/}

          <OpenMuseumGift>
            <SectionTitle textSize={42}>If you're at the museum now...</SectionTitle>

            <Link to={`/gift/${config.curatedMuseumGiftId}`}>

              <OpenMuseumGiftSvg>
                <SvgGift colour='black' />
              </OpenMuseumGiftSvg>

              <OpenYourGift>
                <TextResize textSize={42}>
                  Open your gift from<br/>
                  {museumName}
                </TextResize>
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
              <Link to='/create-gift'>
                <TextResize textSize={42}>
                  Create a new gift of<br/>
                  your own
                </TextResize>
                <PlusStyle>
                  <SvgAddCircle />
                </PlusStyle>
              </Link>
            </GiftsNotSent>
          }

        </HomeContent>
      </Panel>

    </>

  );

};

export {
  HomeGifts,
};
