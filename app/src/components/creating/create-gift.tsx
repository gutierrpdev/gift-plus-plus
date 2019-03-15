import React from 'react';

import { assertNever } from '../../utils/helpers';

import { Gift } from '../../domain';
import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { ReceivingChooseLocation, RecipientLocation } from '../receiving/panels/choose-location';
import { Button, Buttons } from '../buttons';
import { StyledPanel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';

/**
 * Gift Create screen top level component
 */

// Current status of this screen
type Status = 'start' | 'select-part' | 'creating-part' | 'sign-gift';
/* Todo : other parts include verify and send, but these are likely reached from a verification email link
   and so might be a seperate screen, with the gift already saved */

interface Props {
  gift: Gift;
  museumName: string;
}

interface State {
  status: Status;
  recipientLocation: RecipientLocation;
  compactHeader: boolean;
}

class ReceiveGift extends React.PureComponent<Props, State> {

  public state: State = {
    status: 'start',
    recipientLocation: 'Unknown',
    compactHeader: false,
  };

  // Select Part
  public selectPart = () => {
    this.setState({
      status: 'select-part',
    });
  }

  // Creating part
  public createPart = () => {
    // this.setCompactHeader();
    this.setState({
      status: 'creating-part',
    });
  }

  // Sign gift
  public signGift = () => {
    this.setState({
      status: 'sign-gift',
    });
  }

  // Return the correct content based on status
  public renderContent() {
    switch (this.state.status) {
      case 'start':
        return this.renderStart();
      case 'select-part':
        return this.renderSelectPart();
      case 'creating-part':
        return this.renderCreatingPart();
      case 'sign-gift':
        return this.renderSignGift();
      default:
        return assertNever(this.state.status);
    }
  }

  // Start section
  public renderStart() {
    return (
      null
    );
  }

  public renderSelectPart() {
    return (
      null
    );
  }

  public renderCreatingPart() {
    return (
      null
    );
  }

  public renderSignGift() {
    return (
      null
    );
  }

  public render() {

    const { status, compactHeader } = this.state;

    // The header size is based on our current state
    const headerSize = compactHeader
                     ? 'compact'
                     : status === 'start' ? 'big' : 'small';

    // Background
    const bgImage = require('../../assets/svg/trianglify-2.svg');

    return (
      <ScreenManager backgroundImageUrl={bgImage}>
        <GlobalStyles />

        {headerSize === 'big' && // todo, no design yet
          <ScreenHeader
            subTitle={`Making a gift for`}
            postSubTitle={`from`}
            title={this.props.gift.senderName}
            postTitle={`at ${this.props.museumName}`}
            showLogo={false}
            topPadding={true}
          />
        }
        {headerSize === 'small' &&
          <ScreenHeader
            postSubTitle={`Making a gift for`}
            title={this.props.gift.senderName}
            showLogo={true}
          />
        }
        {headerSize === 'compact' &&
          <ScreenHeader
            postSubTitle={`Making a gift for`}
            title={this.props.gift.senderName}
            showLogo={false}
          />
        }

        {this.renderContent()}
      </ScreenManager>
    );
  }
}

export {
  ReceiveGift,
};
