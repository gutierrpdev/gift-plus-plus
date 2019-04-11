import React, { useState } from 'react';
import styled from 'styled-components';

import SvgCloseCircle from './svg/close-circle';

// Close circle
const SvgCloseCircleStyled = styled(SvgCloseCircle)`
  width: 8%;
  top: 2.5%;
  right: 2%;
  position: absolute;
  cursor: pointer;
  z-index: 10;
`;

const InfoPopoverOuter = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 5000;
`;

const InfoPopoverInner = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 10% 12%;
  overflow: scroll;
`;

interface InfoPopoverProps {
  onClose: () => void;
}

// Info Popover component
const InfoPopover: React.FC<InfoPopoverProps> = (props) => {

  function handleClose() {
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <InfoPopoverOuter>
      <SvgCloseCircleStyled onClick={handleClose} />
      <InfoPopoverInner>
        {props.children}
      </InfoPopoverInner>
    </InfoPopoverOuter>
  );
};

export {
  InfoPopover,
};
