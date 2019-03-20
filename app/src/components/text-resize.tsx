import React from 'react';
import styled from 'styled-components';

interface Props {
  mobileSize: number;
  desktopSize?: number; // Optional value for desktop.  Calculated if not included
}

const TextResize = styled.div<Props>`
  font-size: ${(props) => (props.mobileSize / 10)}vw;
  @media (min-width: 768px) {
    font-size: ${(props) => Math.round( props.desktopSize ? props.desktopSize : (props.mobileSize * 4.8) )}%;
  };
`;

export {
  TextResize,
};
