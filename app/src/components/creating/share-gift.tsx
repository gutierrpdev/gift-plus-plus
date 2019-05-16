import React from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { Buttons, Button } from '../buttons';

import { isIosDevice } from '../../utils/helpers';

const ShareLink = styled.a`
  display: block;
  margin-bottom: 3vh;
  font-weight: bold;
`;

const Shares = styled.div`
  margin: 10vh 0 0;
`;

/**
 * Share the gift
 */

interface Props {
  senderName: string; // Sender name to show
  recipientName: string; // Sender name to show
  url: string; // URL to share
  onComplete: () => void; // Callback to call when complete
}

export const ShareGift: React.FC<Props> = ({ senderName, recipientName, url, onComplete }) => {

  // Encode the URL for sharing
  const shareTitle = `Here is a gift from ${senderName}`;

  // Prepare all of the URLS
  const emailLink = encodeURI(`mailto:?&subject=${shareTitle}&body=${shareTitle} ${url}`);
  const fbMessengerLink = encodeURI(`fb-messenger://share/?link=${url}`);
  const whatsAppsLink = encodeURI(`whatsapp://send?text=${shareTitle} ${url}`);

  // Different format for iOS SMS
  const iosSmsLink = encodeURI(`sms:&body=${shareTitle} ${url}`);
  const androidSmsLink = encodeURI(`sms:?&body=${shareTitle} ${url}`);
  const smsLink = isIosDevice() ? iosSmsLink : androidSmsLink;

  return (
    <Panel>
      <PanelTitle>Share your gift</PanelTitle>
      <PanelContent>
        <PanelSubTitle>Share your gift with {recipientName}</PanelSubTitle>
        <Shares>
          <ShareLink href={emailLink}>Share via Email</ShareLink>
          <ShareLink href={fbMessengerLink}>Share In Facebook Messenger (mobile only)</ShareLink>
          <ShareLink
            href={whatsAppsLink}
            data-action='share/whatsapp/share'
            target='_blank'
          >
            Share via Whatsapp (mobile only)
          </ShareLink>
          <ShareLink href={smsLink}>Share via SMS</ShareLink>
        </Shares>
      </PanelContent>
      <Buttons>
        <Button onClick={onComplete}>Continue</Button>
      </Buttons>
    </Panel>
  );
};
