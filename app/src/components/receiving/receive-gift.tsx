import React from 'react';
import { Link } from 'react-router-dom';

import { assertNever } from '../../utils/helpers';

import { Gift } from '../../domain';
import { GlobalStyles } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader } from '../screen-header';
import { GiftPartsManager } from './gift-parts-manager';
import { ChooseLocation, RecipientLocation } from '../choose-location';
import { Button, Buttons } from '../buttons';
import { ReceivingOpenGift } from './open-gift';
import { Panel, PanelContent } from '../panel';
import { PanelPrompt } from '../panel-prompt';
import { BgSvgFullScreen } from '../svg/bg';
import { track, receivingGiftLocationSelectedEvent } from '../../utils/events';

/**
 * Gift Receive screen top level component
 */

// Current status of this screen
type ReceiveGiftStatus = 'Welcome' | 'SelectLocation' | 'OpenOrSave' | 'ShowingParts';

interface Props {
  gift: Gift;
  museumName: string;
}

interface State {
  status: ReceiveGiftStatus;
  recipientLocation: RecipientLocation;
  compactHeader: boolean;
}

class ReceiveGift extends React.PureComponent<Props, State> {

  public state: State = {
    status: 'Welcome',
    recipientLocation: 'unknown',
    compactHeader: false,
  };

  // Lets start
  public startGift = () => {
    this.setState({
      status: 'SelectLocation',
    });
  }

  // Gift has been opened
  public openGift = () => {
    this.setCompactHeader();
    this.setState({
      status: 'ShowingParts',
    });
  }

  // Sets the location
  public handleSetLocation = (recipientLocation: RecipientLocation) => {

    // todo: we may have already selected the location and stored it, us that, but ensure tracking the event is called
    track(receivingGiftLocationSelectedEvent( {giftId: this.props.gift.id, location: recipientLocation} ));

    // Determine the next stage based on the location
    const nextStage: ReceiveGiftStatus = recipientLocation === 'not-at-museum'
      ? 'OpenOrSave'
      : 'ShowingParts';

    // Store this
    this.setState({
      recipientLocation,
      status: nextStage,
    });

  }

  // Set the header to be compact
  public setCompactHeader = () => {
    this.setState({
      compactHeader: true,
    });
  }

  // Return the correct content based on status
  public renderContent() {
    switch (this.state.status) {
      case 'Welcome':
        return this.renderWelcome();
      case 'OpenOrSave':
        return this.renderOpenOrSave();
      case 'SelectLocation':
        return this.renderSelectLocation();
      case 'ShowingParts':
        return this.renderGiftParts();
      default:
        return assertNever(this.state.status);
    }
  }

  public renderWelcome() {
    return (
      <ReceivingOpenGift onComplete={this.startGift} />
    );
  }

  public renderOpenOrSave() {
    return (
      <Panel>
        <PanelContent>
          <PanelPrompt
            text={`Would you like to save the gift for when you're at the museum or open it anyway?`}
            background={'transparent-black'}
          />
        </PanelContent>
        <Buttons>
          <Button><Link to='/'>Save it</Link></Button>
          <Button onClick={this.openGift} primary={true}>Open it anyway</Button>
        </Buttons>
      </Panel>
    );
  }

  public renderGiftParts() {
    return (
      <GiftPartsManager
        gift={this.props.gift}
        recipientLocation={this.state.recipientLocation}
      />
    );
  }

  public renderSelectLocation() {
    return (
      <ChooseLocation
        museumName={this.props.museumName}
        doSetLocation={this.handleSetLocation}
      />
    );
  }

  public render() {

    const { status, compactHeader } = this.state;

    // The header size is based on our current state
    const headerSize = compactHeader ? 'compact'
      : status === 'Welcome' || status === 'SelectLocation' || status === 'OpenOrSave'
      ? 'big' : 'small';

    return (
      <ScreenManager>
        <BgSvgFullScreen />
        <GlobalStyles />

        {headerSize === 'big' &&
          <ScreenHeader
            subTitle={`Here's your gift`}
            postSubTitle='from'
            title={this.props.gift.senderName}
            postTitle={`at ${this.props.museumName}`}
            showLogo={false}
            topPadding='large'
          />
        }
        {headerSize === 'small' &&
          <ScreenHeader
            postSubTitle={`Your gift from`}
            title={this.props.gift.senderName}
            postTitle={`at ${this.props.museumName}`}
            showLogo={false}
            background='white'
          />
        }
        {headerSize === 'compact' &&
          <ScreenHeader
            postSubTitle={`Your gift from`}
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
