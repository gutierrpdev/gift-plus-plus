import React from 'react';

import { Gift } from '../domain';
import { GlobalStyles, NoScroll } from '../themes/global';
import { ScreenManager } from '../components/screen-manager';
import { ScreenHeader, ScreenHeaderSize } from '../components/screen-header';
import { GiftPartsManager } from '../components/receiving/gift-parts-manager';
import { Button } from '../components/buttons';

/**
 * Gift Receive screen
 */

// Current status of this screen
enum ReceiveGiftStatus {'OpenOrSave', 'SelectPart', 'PartOpen'}

interface Props {
  gift: Gift;
  museumName: string;

}

interface State {
  status: ReceiveGiftStatus;
}

class ReceiveGift extends React.PureComponent<Props, State> {

  public static defaultProps = {
    // gift: null,
    // museumName: '',
  };

  public state = {
    status: ReceiveGiftStatus.OpenOrSave,
  };

  // Gift has been opened
  public openGift = () => {
    this.setState({
      status: ReceiveGiftStatus.SelectPart,
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
      status: ReceiveGiftStatus.PartOpen,
    });
  }

  // Return the correct content based on status
  public renderContent() {
    switch (this.state.status) {
      case ReceiveGiftStatus.OpenOrSave:
        return this.renderOpenOrSave();
      case ReceiveGiftStatus.SelectPart:
      case ReceiveGiftStatus.PartOpen:
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
    return <GiftPartsManager gift={this.props.gift} onClick={this.openGiftPart} />;
  }

  public render() {

    // The header size is based on our current state
    const headerSize = this.state.status === ReceiveGiftStatus.PartOpen ? ScreenHeaderSize.Small : ScreenHeaderSize.Big;

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
