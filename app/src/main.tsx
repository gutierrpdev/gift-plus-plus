import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../src/utils/router-history';

import { UnderConstruction } from './screens/under-construction';
import { NotFound } from './screens/not-found';
import { ReceiveGiftScreen } from './screens/receive-gift';
import { CreateGiftScreen } from './screens/create-gift';
import { HomeScreen } from './screens/home';
import { HomeGiftsScreen } from './screens/home-gifts';
import { LandscapeMessage } from './components/landscape-message';

/**
 * NOTE: We use `children` in Routes rather than the `component` prop for the
 * sake of type-safety. Otherwise the type-checker won't be able to enforce
 * that we've passed the correct props into the rendered component.
 * (Alternatively, could use `render` prop).
 */

export const Main: React.FC = () => (
  <Router history={history}>
    <LandscapeMessage />
    <Switch>

      <Route exact={true} path='/'>
        <HomeScreen />
      </Route>

      {/* todo: remove /testing */}
      <Route exact={true} path='/testing'>
        <UnderConstruction />
      </Route>

      <Route exact={true} path='/home'>
        <HomeGiftsScreen />
      </Route>

      <Route exact={true} path='/create-gift'>
        <CreateGiftScreen />
      </Route>

      <Route path='/gift/:giftId'>
        <ReceiveGiftScreen />
      </Route>

      <Route>
        <NotFound />
      </Route>

    </Switch>
  </Router>
);
