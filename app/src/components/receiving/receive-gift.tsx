import React from 'react';

import { assertNever } from '../../utils/helpers';

import { Gift } from '../../domain';
import { GlobalStyles, NoScroll } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader, ScreenHeaderSize } from '../screen-header';
import { GiftPartsManager } from './gift-parts-manager';
import { ReceivingChooseLocation, RecipientLocation } from '../receiving/panels/choose-location';
import { Button, Buttons } from '../buttons';
import { ReceivingOpenGift } from './open-gift';

/**
 * Gift Receive screen
 */

// Current status of this screen
type ReceiveGiftStatus =  'Welcome' | 'SelectLocation' | 'OpenOrSave' |  'ShowingParts';

interface Props {
  gift: Gift;
  museumName: string;
}

interface State {
  status: ReceiveGiftStatus;
  recipientLocation: RecipientLocation;
}

class ReceiveGift extends React.PureComponent<Props, State> {

  public state: State = {
    status: 'Welcome',
    recipientLocation: 'Unknown',
  };

  // Lets start
  public startGift = () => {
    this.setState({
      status: 'SelectLocation',
    });
  }

  // Gift has been opened
  public openGift = () => {
    this.setState({
      status: 'ShowingParts',
    });
  }

  // Save for later
  public saveForLater = () => {
    // todo
    alert('I would go somewhere else now....');
  }

  // Sets the location
  public handleSetLocation = (recipientLocation: RecipientLocation) => {

    // Store this
    this.setState({
      recipientLocation,
      status: 'OpenOrSave',
    });

    // Update to next stage
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
      <Buttons>
        <Button onClick={this.openGift}>Open it now</Button>
        <Button onClick={this.saveForLater}>Save for later</Button>
      </Buttons>
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
      <ReceivingChooseLocation
        museumName={this.props.museumName}
        doSetLocation={this.handleSetLocation}
      />
    );
  }

  public render() {

    const { status } = this.state;

    // The header size is based on our current state
    const headerSize = status === 'Welcome' || status === 'OpenOrSave'  ?
      'Big' : 'Small';

    // Background
    const bgImage = (status === 'Welcome' || status === 'SelectLocation' ?
      require('../../assets/svg/trianglify-2.svg') : null );

    // Logo
    const showLogo = false;

    return (
      <ScreenManager backgroundImageUrl={bgImage}>
        <GlobalStyles />
        <NoScroll />

        {headerSize === 'Big' &&
          <ScreenHeader
            subTitle={`Heres's your gift`}
            postSubTitle={`from`}
            title={this.props.gift.senderName}
            postTitle={`at ${this.props.museumName}`}
            showLogo={showLogo}
            topPadding={true}
          />
        }
        {headerSize === 'Small' &&
          <ScreenHeader
            subTitle={`Heres's your gift`}
            postSubTitle={`from`}
            title={this.props.gift.senderName}
            postTitle={`at ${this.props.museumName}`}
            showLogo={showLogo}
            topPadding={true}
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
