import React from 'react';
import useReactRouter from 'use-react-router';
import { useAsync } from '../utils/helpers';
import { api } from '../services';


export const ReceiveGift: React.FC = () => {
  const { match } = useReactRouter<{ giftId: string }>();
  const { giftId } = match.params;

  const [getGiftAsync] = useAsync(() => api.getGift(giftId), [giftId]);

  console.log(getGiftAsync);

  return <h1>{getGiftAsync.kind}</h1>;
};
