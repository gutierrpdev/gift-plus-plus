import React from 'react';
import styled from 'styled-components';

import { Panel, PanelContent } from '../panel';
import { PanelTitle } from '../panel-title';
import { PanelSubTitle } from '../panel-sub-title';
import { Buttons, Button } from '../buttons';

import { isIosDevice } from '../../utils/helpers';

const ShareLink = styled.a`
  margin-bottom: 3vh;
  font-weight: bold;
`;


/**
 * Share the gift
 */

interface Props {
  url: string;
}

export const ShareGift: React.FC<Props> = ({ url }) => {

  // Encode the URL for sharing
  const shareTitle = 'Here is a gift from Nick';

  // Prepare all of the URLS
  const emailLink = encodeURI(`mailto:?&subject=${shareTitle}&body=${shareTitle} ${url}`);
  const facebookLink = encodeURI(`https://www.facebook.com/sharer/sharer.php?u=${url}`);
  const fbMessengerLink = encodeURI(`fb-messenger://share/?link=${url}`);
  const twitterLink = encodeURI(`https://twitter.com/home?status=${url}`);
  const whatsAppsLink = encodeURI(`whatsapp://send?text=${shareTitle} ${url}`);

  // Different format for iOS SMS
  const iosSmsLink = encodeURI(`sms:&body=${shareTitle} ${url}`);
  const androidSmsLink = encodeURI(`sms:?&body=${shareTitle} ${url}`);
  const smsLink = isIosDevice() ? iosSmsLink : androidSmsLink;

  return (
    <Panel>
      <PanelTitle>Share your gift</PanelTitle>
      <PanelContent>
        <ShareLink href={emailLink}>Share via Email</ShareLink>
        <ShareLink target='_blank' href={facebookLink}>Share on Facebook</ShareLink>
        <ShareLink href={fbMessengerLink}>Share In Facebook Messenger (mobile only)</ShareLink>
        <ShareLink target='_blank' href={twitterLink}>Share on Twitter</ShareLink>
        <ShareLink
          href={whatsAppsLink}
          data-action='share/whatsapp/share'
          target='_blank'
        >
          Share via Whatsapp (mobile only)
        </ShareLink>
        <ShareLink href={smsLink}>Share via SMS</ShareLink>
      </PanelContent>
      <Buttons>
        {/* <Button>OK</Button> */}
      </Buttons>
    </Panel>
  );
};
