import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { BaseModalDialog } from './base-modal-dialog';
import { TextResize } from '../text-resize';
import { Button, Buttons } from '../buttons';
import SvgSuccess from '../svg/success';
import SvgAlert from '../svg/alert';
import SvgGift from '../svg/gift';

/**
 * Working dialog to show progress when online work is taking place, i.e. uploading
 */

export type WorkingModalIconType =
  | 'working'
  | 'error'
  | 'success'
;

const Outer = styled(BaseModalDialog)`
  background-color: rgba(0,0,0,0.6);
`;

const Inner = styled.div`
  width: 90%;
  margin: 0 auto;
  top: 50%;
  position: relative;
  transform: translateY(-50%);
  background-color: white;
  border-radius: ${global.borderRadius};
  padding: 5% 0 0;
`;

const Message = styled(TextResize)`
  text-align: center;
  padding: 0 5% 7%;
  margin-bottom: 1%;
`;

interface IconProps {
  iconType: WorkingModalIconType; // Icon to show
}

const Icon: React.FC<IconProps> = ({ iconType }) => {

  if (iconType === 'error') return <SvgAlert />;
  if (iconType === 'success') return <SvgSuccess />;
  if (iconType === 'working') return <SvgGift colour='black' />;

  // Default
  return null;
};

const IconWrapper = styled.div`
  width: 20%;
  margin: 2% auto 2%;
`;

const ModalButtons = styled(Buttons)`
  border-top: 0.1vh solid rgba(0,0,0,0.5);
  padding-bottom: 1%;
`;

interface Props {
  message: string; // The message to show the user
  iconType: WorkingModalIconType; // Icon to show
  buttonText?: string; // Text to show in the button.  Leave blank for no button
  onButtonClick?: () => void; // Callback when the button is clicked
}

const WorkingModal: React.FC<Props> = ({ message, iconType, buttonText, onButtonClick }) => {

  function handleButtonClick() {
    if (onButtonClick) {
      onButtonClick();
    }
  }

  return (
    <Outer>
      <Inner>

        <IconWrapper>
          <Icon iconType={iconType} />
        </IconWrapper>

        <Message>{message}</Message>

        {buttonText &&
        <ModalButtons>
          <Button onClick={handleButtonClick}>{buttonText}</Button>
        </ModalButtons>}

      </Inner>
    </Outer>
  );

};

export {
  WorkingModal,
};
