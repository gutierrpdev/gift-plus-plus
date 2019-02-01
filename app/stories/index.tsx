import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Welcome from '../src/screens/Welcome';
import ReceiveGift from '../src/screens/ReceiveGift';

import { giftThreeParts } from './fixtures';


storiesOf('Test Examples', module)
  .add('Welcome', () => <Welcome onStartPressed={action('start pressed')} />)
  .add('Welcome link to receiving', () => <Welcome onStartPressed={linkTo('Receiving', 'At Museum')} />);

storiesOf('Test Examples/Buttons', module)
  .add('Button with text', () => <button onClick={action('clicked')}>Hello Button</button>)
  .add('Button with emoji', () => (
    <button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </button>
  ));
;



storiesOf('Receiving', module)
  .add('At museum', () => <ReceiveGift gift={giftThreeParts} />)
  .add('Remotely', () => <h1>TODO</h1>)
;
