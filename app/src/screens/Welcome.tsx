import React from 'react';

interface Props {
  onStartPressed: () => void,
};

const Welcome: React.FunctionComponent<Props> = ({ onStartPressed }: Props) => (
  <div>
    <h1>WELCOME!</h1>
    <p>Hi there</p>
    <button onClick={onStartPressed}>Start</button>
  </div>
);

export default Welcome
