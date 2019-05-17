import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { isIosDevice } from '../../utils/helpers';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { Buttons, Button } from '../buttons';
import { TextResize } from '../text-resize';

import SvgIconSms from '../svg/icon-sms';
import SvgIconEmail from '../svg/icon-email';
import SvgIconWhatsApp from '../svg/icon-whatsapp';
import SvgIconMessenger from '../svg/icon-messenger';
import SvgArrowForward from '../svg/arrow-forward';

/**
 * Component that allows a gift to be shared
 */

const Shares = styled.div`
  margin: 1vh 0 0;
  padding: 0 3%;
  width: 100%;
`;

// Share link
const ShareLinkStyle = styled.a`
  display: flex;
  margin-bottom: 2vh;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.7);
  position: relative;
  z-index: 1;
  padding: 3vw 3vw;
  border-radius: ${global.borderRadius};
  width: 100%;
  text-align: center;
  align-items: center;
`;

const ShareLinkIcon = styled.div`
  width: 15%;
  height: auto;
  opacity: 0.7;
`;

const ShareLinkText = styled.div`
  width: 100%;
  font-family: ${global.fonts.title.family};
  font-weight: ${global.fonts.title.normal};
  font-style: italic;
`;

const ShareLinkArrow = styled.div`
  width: 10%;
  margin-left: 5%;
  opacity: 0.7;
`;

interface ShareLinkProps {
  icon: JSX.Element;
  text: string;
  url: string;
  target?: string; // Target for anchor target
  dataAction?: string; // data-target attribute for anchor
}

export const ShareLink: React.FC<ShareLinkProps> = ({ icon, text, url, target, dataAction }) => {
  return (
    <ShareLinkStyle
      href={url}
      target={target}
      data-action={dataAction}
    >
      <ShareLinkIcon>{icon}</ShareLinkIcon>
      <ShareLinkText><TextResize textSize={50}>{text}</TextResize></ShareLinkText>
      <ShareLinkArrow><SvgArrowForward /></ShareLinkArrow>
    </ShareLinkStyle>
  );
};

// Share component
interface ShareGiftProps {
  senderName: string;
  recipientName: string;
  museumName: string;
  url: string; // URL to share
  onComplete: () => void; // Callback to call when complete
}

export const ShareGift: React.FC<ShareGiftProps> = ({ senderName, recipientName, museumName, url, onComplete }) => {

  // String templates
  const shareText = `Here's a gift that I made for you at ${museumName}... `;
  const emailText = `mailto:?subject=A gift from me at ${museumName}...&body=Dear ${recipientName},

  Here's a gift that I made for you at ${museumName}. Click on the link below to open it!

  ${url}

  ${senderName}`;

  // Prepare all of the URLS
  const emailLink = encodeURI(emailText);
  const fbMessengerLink = encodeURI(`fb-messenger://share/?link=${url}`);
  const whatsAppsLink = encodeURI(`whatsapp://send?text=${shareText} ${url}`);

  // Different format for iOS SMS
  const iosSmsLink = encodeURI(`sms:&body=${shareText} ${url}`);
  const androidSmsLink = encodeURI(`sms:?&body=${shareText} ${url}`);
  const smsLink = isIosDevice() ? iosSmsLink : androidSmsLink;

  return (
    <Panel>

      <PanelTitle>Share your gift</PanelTitle>

      <PanelContent>
        <Shares>

          <ShareLink url={smsLink} text='SMS' icon={<SvgIconSms/>} />

          <ShareLink url={emailLink} text='Email' icon={<SvgIconEmail/>} />

          <ShareLink
            url={whatsAppsLink}
            text='WhatsApp'
            icon={<SvgIconWhatsApp/>}
            dataAction='share/whatsapp/share'
            target='_blank'
          />

          <ShareLink url={fbMessengerLink} text='Messenger' icon={<SvgIconMessenger/>} />

        </Shares>
      </PanelContent>

      <Buttons>
        <Button onClick={onComplete} colour={'black'}>Continue</Button>
      </Buttons>

    </Panel>
  );
};
