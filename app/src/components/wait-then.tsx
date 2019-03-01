import React from 'react';

/***
 * Wait an amount of time, and then do a callback
 */

interface Props {
  wait: number;
  andThen: () => void;
}

const WaitThen: React.FC<Props> = ({wait, andThen}) => {

  function waitAndThen() {
    if (wait && andThen) {
      setTimeout(() => {
        andThen();
      }, wait * 1000);
    }
  }

  return (
    <>
      {waitAndThen()}
    </>
  );

};

export {
  WaitThen,
};
