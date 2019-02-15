import React, { useState, useEffect } from 'react';
import { api } from '../services';

interface State {
  gift?: {};
}

export const ReceiveGift: React.FC = () => {

  const [state, setState] = useState<State>({});
  useEffect(
    () => {
      api.getGift('some-gift-id').then((apiResult) => {
        setState({ gift: apiResult });
      });
    },
    [],
  );

  if (state.gift) {
    return <h1>Something</h1>;
  } else {
    return <h1>Nothing</h1>;
  }
};
