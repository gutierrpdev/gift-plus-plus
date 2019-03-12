import React from 'react';

import { assertNever } from '../../utils/helpers';

import { Gift } from '../../domain';
import { GlobalStyles, NoScroll } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader, ScreenHeaderSize } from '../screen-header';
import { GiftPartsManager } from './gift-parts-manager';
import { ReceivingChooseLocation, RecipientLocation } from '../receiving/panels/choose-location';
import { Button, Buttons } from '../buttons';

/**
 * Gift Receive screen
 */

// Current status of this screen
type ReceiveGiftStatus = 'OpenOrSave' | 'SelectLocation' | 'ShowingParts';

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
    status: 'OpenOrSave',
    recipientLocation: 'Unknown',
  };

  // Gift has been opened
  public openGift = () => {
    this.setState({
      status: 'SelectLocation',
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
      status: 'ShowingParts',
    });

    // Update to next stage
  }

  // Return the correct content based on status
  public renderContent() {
    switch (this.state.status) {
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

    // The header size is based on our current state
    const headerSize = this.state.status === 'OpenOrSave' ? 'Big' : 'Small';

    return (
      <ScreenManager>
        <GlobalStyles />
        <NoScroll />

        <ScreenHeader gift={this.props.gift} title={this.props.museumName} size={headerSize} />
        {this.renderContent()}
      </ScreenManager>
    );
  }
}


export {
  ReceiveGift,
};
