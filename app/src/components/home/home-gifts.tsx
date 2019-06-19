import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { events } from '../../services';
import { hGiftsCreatePressedEvent, hGiftsOpenMuseumGiftPressedEvent } from '../../event-definitions';

import { config } from '../../config';
import { global } from '../../themes/global';
import { Gift } from '../../domain';
import { getSessionRecipientLocation, getSentGifts, getReceivedGifts } from '../../utils/local';

import { InformationWindow } from '../modals/information-window';
import { HelpContent } from '../information/help';
import { PanelTitle } from '../panel-title';
import { TextResize } from '../text-resize';
import { GiftPile } from '../gift-pile';
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
  margin: 15% auto 1%;
  width: 30%;
`;
const OpenYourGift = styled.div`
  line-height: 1.3;
  margin-bottom: 18%;
`;
const OpenYourGiftText = styled(TextResize)`
  margin: 0 auto;
  max-width: 70%;
`;


const PlusStyle = styled.div`
  margin: 4% auto 0;
  width: 30%;
  cursor: pointer;
`;

const HomeContent = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  position: relative;
  width: 100%;
`;

const GiftsNotSent = styled.div`
  text-align: center;
  margin: 4% auto 5%; /* Extra spacing at the end to avoid clash with brower chrome */
  div {
    line-height: 1.3;
  }
`;

const CreateAGiftOfYourOwn = styled(TextResize)`
  margin: 0 auto;
  max-width: 70%;
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
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.normal};
`;

const SectionTitle = styled(PanelTitle)`
  margin-bottom: 2%;
`;

const FeedbackSection = styled.div`
  margin: 5vh 0 15vh;
`;

/**
 * Home screen gifts top level component
 */

interface HomeGiftProps {
  museumName: string;
}

const HomeGifts: React.FC<HomeGiftProps> = ({ museumName }) => {

  // State
  const [helpIsOpen, setHelpIsOpen] = useState(false);

  // Get local values
  const giftsReceived: Gift[] = getReceivedGifts();
  const giftsSent: Gift[] = getSentGifts();

  // Prep for render
  // const hasReceivedGifts = giftsReceived.length > 0;
  const hasReceivedGifts = false;
  // const hasSentGifts = giftsSent.length > 0;
  const hasSentGifts = false;
  const atMuseum = getSessionRecipientLocation() === 'at-museum';

  return (

    <>
      {helpIsOpen &&
        <InformationWindow
          onClose={() => { setHelpIsOpen(false); }}
        >
          <HelpContent />
        </InformationWindow>
      }

      <HomeContent>

        <HeaderMessage>
          <HeaderMessageTextResize textSize={42}>
            Think of someone special<br/>
            and create a playlist for them<br/>
            from objects around the museum
          </HeaderMessageTextResize>

          <ReadMoreLink onClick={() => {setHelpIsOpen(true); }}>
            <TextResize textSize={42}>Learn more...</TextResize>
          </ReadMoreLink>
        </HeaderMessage>

        <LineSpacer />

        {!atMuseum && <SectionTitle textSize={42}>If you're at the museum now...</SectionTitle>}

        {hasSentGifts &&
          <>
            <PanelTitle textSize={50}>Gifts you've sent...</PanelTitle>
            <GiftPile
              gifts={giftsSent}
              source={'sent'}
            />
          </>
        }
        {!hasSentGifts &&
          <GiftsNotSent>
            {/* <TextResize textSize={50}>
              You've not sent any gifts<br/>
              Make one now?
            </TextResize> */}
            <Link
              onClick={() => events.track(hGiftsCreatePressedEvent())}
              to='/create-gift'
            >
              <CreateAGiftOfYourOwn textSize={42}>
                Create a new gift of your own
              </CreateAGiftOfYourOwn>
              <PlusStyle>
                <SvgAddCircle />
              </PlusStyle>
            </Link>
          </GiftsNotSent>
        }

        <LineSpacer />

        {hasReceivedGifts &&
          <>
            <PanelTitle textSize={50}>Gifts you've been given...</PanelTitle>
            <GiftPile
              gifts={giftsReceived}
              source={'received'}
            />
          </>
        }

        <OpenMuseumGift>

          <Link
            onClick={() => events.track(hGiftsOpenMuseumGiftPressedEvent())}
            to={`/gift/${config.curatedMuseumGiftId}`}
          >

            <OpenMuseumGiftSvg>
              <SvgGift colour='black' />
            </OpenMuseumGiftSvg>

            <OpenYourGift>
              <OpenYourGiftText textSize={42}>
                Show the gift from {museumName}
              </OpenYourGiftText>
            </OpenYourGift>

          </Link>
        </OpenMuseumGift>

        <LineSpacer />

        <FeedbackSection>
          <ReadMoreLink>
            <TextResize textSize={42}>
              <a href='https://www.surveymonkey.co.uk/r/S3FPSJB' target='_blank'>Tell us what you thought...</a>
            </TextResize>
          </ReadMoreLink>
        </FeedbackSection>

      </HomeContent>

    </>

  );

};

export {
  HomeGifts,
};
