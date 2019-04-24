import React from 'react';
import styled from 'styled-components';

import { global } from '../themes/global';

const Outer = styled.div`
  background-color: ${global.colour.lightGrey};
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 300px;
  color: black;
`;

interface Props {
}

const MessageModal: React.FC<Props> = ({ children }) => {

  return (
    <Outer>
      <Inner>
        {children}
      </Inner>
    </Outer>
  );

};

export {
  MessageModal,
};
