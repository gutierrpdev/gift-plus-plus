import React from 'react';

import { Gift } from '../domain';
import { GlobalStyles, NoScroll } from '../themes/global';
import { ScreenManager } from '../components/screen-manager';
import { ScreenHeader, ScreenHeaderSize } from '../components/screen-header';
import { GiftPartsManager } from '../components/gift-parts-manager';

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
  }

  // Open gift part
  public openGiftPart = () => {
    this.setState({
      status: ReceiveGiftStatus.PartOpen,
    });
  }

  public render() {

    // The header size is based on our current state
    const headerSize = this.state.status === ReceiveGiftStatus.PartOpen ? ScreenHeaderSize.Small : ScreenHeaderSize.Big;

    return (

    <ScreenManager>
      <GlobalStyles />
      <NoScroll />

      <ScreenHeader gift={this.props.gift} title={this.props.museumName} size={headerSize} />

      <GiftPartsManager gift={this.props.gift} onClick={this.openGiftPart} />
    </ScreenManager>
    );
    }
}


export {
  ReceiveGift,
};
