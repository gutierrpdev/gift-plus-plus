import React from 'react';
import styled from 'styled-components';

import { global } from '../../themes/global';
import { BaseModal } from './base-modal';
import { TextResize } from '../text-resize';

import SvgGift from '../svg/gift';

const GiftImg = styled.div`
  margin: 5% auto 10%;
  width: 35%;
`;

const Outer = styled(BaseModal)`
  background-color: ${global.colour.lightGrey};
  display: flex;
  align-items: center;
`;

const Inner = styled.div`
  width: 100%;
  margin: 0 auto;
  max-width: 300px;
  justify-items: center;
  text-align: center;
`;

const Message = styled(TextResize)`

`;

const Status = styled(TextResize)`
  margin: 10% 0 0;
`;

interface Props {
  message: string; // The message to show the user
  status?: string; // Optional status, e.g. 'Saving...'
}

const WorkingModal: React.FC<Props> = ({ message, status }) => {

  return (
    <Outer>
      <Inner>

        <GiftImg>
          <SvgGift colour='white' />
        </GiftImg>

        <Message>{message}</Message>

        {status && <Status textSize={30}>{status}</Status>}

      </Inner>
    </Outer>
  );

};

export {
  WorkingModal,
};
