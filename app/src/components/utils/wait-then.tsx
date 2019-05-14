import React, { useEffect } from 'react';

/**
 * Wait an amount of time, and then do a callback
 */

interface Props {
  wait: number; // Seconds to wait
  andThen: () => void; // Action to perform
}

export const WaitThen: React.FC<Props> = ({ wait, andThen }) => {
  useEffect(() => {
    const timer = setTimeout(andThen, wait * 1000);
    return () => clearTimeout(timer);
  }, []);

  return null;
};
