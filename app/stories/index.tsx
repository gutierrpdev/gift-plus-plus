import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Welcome from '../src/screens/Welcome';


storiesOf('Welcome', module).add('Test', () => <Welcome onStartPressed={action('start pressed')} />);

storiesOf('Test', module).add('to Storybook', () => <Welcome onStartPressed={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <button onClick={action('clicked')}>Hello Button</button>)
  .add('with some emoji', () => (
    <button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </button>
  ));
