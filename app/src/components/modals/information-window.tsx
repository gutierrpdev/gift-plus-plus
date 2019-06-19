import React from 'react';
import styled from 'styled-components';

import { BaseModalWindow } from './base-modal-window';
import SvgCloseCircle from '../svg/close-circle';

/**
 * Popover Information component.
 * Used for showing information such as Privacy
 */

 // Close button
const CloseButton = styled.button`
  width: 8%;
  top: 2.5%;
  right: 2%;
  position: absolute;
  cursor: pointer;
  z-index: 10;
  border: none;
  padding: 0;
`;

// Close circle
const SvgCloseCircleStyled = styled(SvgCloseCircle)`
`;

const Outer = styled(BaseModalWindow)`
  background-color: white;
  z-index: 12000;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10% 10% 10% 8%;
  overflow: scroll;
  box-sizing: border-box;
`;

interface Props {
  onClose: () => void;
}

// Info Popover component
const InformationWindow: React.FC<Props> = (props) => {

  function handleClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <Outer>
      <CloseButton onClick={handleClose} aria-label='close'>
        <SvgCloseCircleStyled />
      </CloseButton>
      <Inner>
        {props.children}
      </Inner>
    </Outer>
  );
};

export {
  InformationWindow,
};
