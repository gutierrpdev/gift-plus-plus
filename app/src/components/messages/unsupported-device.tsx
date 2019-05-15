import React, { useState } from 'react';
import styled from 'styled-components';

import { Buttons, Button } from '../buttons';
import { ScreenMessage } from './screen-message';
import { ScreenManager } from '../screen-manager';
import { InfoPopover } from '../modals/info-popover';
import { SupportedDeviceList } from '../information/device-list';

/**
 * Component to inform user their device in unspported
 * Used for various messages, i.e. Cannot use Chrome to record audio on iOS, or entire device is too old.
 */

interface Props {
  message: string;
}

const DeviceButtons = styled(Buttons)`
  position: absolute;
  bottom: 0;
  left: 0;
  box-sizing: border-box;
`;

const UnsupportedDevice: React.FC<Props> = ({ message }) => {

  // State
  const [deviceListIsOpen, setDeviceListIsOpen] = useState(false);

  return (
    <ScreenManager>
      <ScreenMessage message={message}>
        <DeviceButtons>
          <Button colour='black' onClick={() => { setDeviceListIsOpen(true); }}>Show supported devices</Button>
        </DeviceButtons>
      </ScreenMessage>
    {deviceListIsOpen &&
      <InfoPopover onClose={() => {setDeviceListIsOpen(false); }}>
        <SupportedDeviceList />
      </InfoPopover>
    }
    </ScreenManager>
  );

};

export {
  UnsupportedDevice,
};