import React from 'react';
import { Gift } from '../domain';

import './ReceiveGift.css';

interface Props {
  gift: Gift,
};

const ReceiveGift: React.FC<Props> = ({ gift }: Props) => (
  <div className="ReceiveGift">
    <h1>Here is your gift from {gift.senderName}!</h1>
    <p>omg</p>
  </div>
);

export default ReceiveGift;
