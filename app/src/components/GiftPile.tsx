import * as React from 'react';
import { Gift } from '../domain';

interface Props {
  gifts: Gift[];
}

const GiftPile: React.FC<Props> = ({ gifts }: Props) => {
  const giftElms = gifts.map((gift, index) => (
    <div key={index}>
      <p>{gift.senderName}</p>
      <img src={gift.parts[0].photo} />
    </div>
  ));

  return (
    <>
      {giftElms}
    </>
  );
};

export {
  GiftPile,
};
