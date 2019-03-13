import React from 'react';
import styled from 'styled-components';

interface Props {
  size: number;
}

const TextResize = styled.div<Props>`
  font-size: ${(props) => (props.size / 10)}vw;
  @media (min-width: 768px) {
    font-size: ${(props) => Math.round(props.size * 4.8)}%;
  };
`;

export {
  TextResize,
};
