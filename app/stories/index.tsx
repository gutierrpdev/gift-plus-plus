import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import ReceiveGift from '../src/screens/ReceiveGift';

import { giftThreeParts } from './fixtures';


storiesOf('Receiving', module)
  .add('At museum', () => <ReceiveGift gift={giftThreeParts} />)
  .add('Remotely', () => <h1>TODO</h1>)
;

storiesOf('Components/Test Examples', module)
  .add('Button with text', () => <button onClick={action('clicked')}>Hello Button</button>)
  .add('Button with link', () => <button onClick={linkTo('Receiving', 'At Museum')}>Go to receiving</button>)
;
