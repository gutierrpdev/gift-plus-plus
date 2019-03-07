import React from 'react';

import { Gift } from '../../domain';
import { GlobalStyles, NoScroll } from '../../themes/global';
import { ScreenManager } from '../screen-manager';
import { ScreenHeader, ScreenHeaderSize } from '../screen-header';
import { GiftPartsManager } from './gift-parts-manager';
import { ReceivingChooseLocation, GiftLocation } from '../receiving/panels/choose-location';
import { Button } from '../buttons';

/**
 * Gift Receive screen
 */

// Current status of this screen
type ReceiveGiftStatus = 'OpenOrSave' | 'SelectLocation' | 'SelectPart' | 'PartOpen';

interface Props {
  gift: Gift;
  museumName: string;
}

interface State {
  status: ReceiveGiftStatus;
  giftLocation: GiftLocation;
}

class ReceiveGift extends React.PureComponent<Props, State> {

  public static defaultProps = {
    // gift: null,
    // museumName: '',
  };

  public state: State = {
    status: 'OpenOrSave',
    giftLocation: 'Unknown',
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

  // Open gift part
  public openGiftPart = () => {
    this.setState({
      status: 'SelectPart',
    });
  }

  // Sets the location
  public handleSetLocation = (giftLocation: GiftLocation) => {

    // Store this
    this.setState({
      giftLocation,
      status: 'SelectPart',
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
      case 'SelectPart':
      case 'PartOpen':
        return this.renderGiftParts();
      default :
        return null; // be nice
    }
  }

  public renderOpenOrSave() {
    return (
      <div>
        <Button onClick={this.openGift}>Open it now</Button>
        <Button onClick={this.saveForLater}>Save for later</Button>
      </div>
    );
  }

  public renderGiftParts() {
    return (
      <GiftPartsManager
        gift={this.props.gift}
        onClick={this.openGiftPart}
        giftLocation={this.state.giftLocation}
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
