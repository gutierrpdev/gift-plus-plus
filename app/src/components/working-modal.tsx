import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';
import { TextResize } from './text-resize';

const Outer = styled.div`
  background-color: ${global.colour.darkGrey};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 300px;
`;

interface Props {
  message: string; // The message to show the user
}

const WorkingModal: React.FC<Props> = ({ message }) => {

  return (
    <Outer>
      <Inner>
        <TextResize>{message}</TextResize>
      </Inner>
    </Outer>
  );

};

export {
  WorkingModal,
};
