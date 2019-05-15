import React from 'react';
import styled from 'styled-components';

import { BaseModalWindow } from './base-modal-window';
import SvgCloseCircle from '../svg/close-circle';

/**
 * Popover Information component.
 * Used for showing information such as Privacy
 */

// Close circle
const SvgCloseCircleStyled = styled(SvgCloseCircle)`
  width: 8%;
  top: 2.5%;
  right: 2%;
  position: absolute;
  cursor: pointer;
  z-index: 10;
`;

const Outer = styled(BaseModalWindow)`
  background-color: white;
`;

const Inner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10% 12%;
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
      <SvgCloseCircleStyled onClick={handleClose} />
      <Inner>
        {props.children}
      </Inner>
    </Outer>
  );
};

export {
  InformationWindow,
};
