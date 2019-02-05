import React from 'react';
import styled from 'styled-components/macro';
import { Gift } from '../domain';

interface Props {
  gift: Gift,
};

const SlideUpText = styled.p`
  animation-duration: 1s;
  animation-name: slideup;

  @keyframes slideup {
    from { margin-top: 100%; }
    to { margin-top: 0%; }
  }
`;

const ReceiveGift: React.FC<Props> = ({ gift }: Props) => (
  <>
    <h1>Here is your gift from {gift.senderName}!</h1>
    <SlideUpText>omg</SlideUpText>
  </>
);

export default ReceiveGift;
