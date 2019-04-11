import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { UnderConstruction } from './screens/under-construction';
import { NotFound } from './screens/not-found';
import { ReceiveGiftScreen } from './screens/receive-gift';
import { CreateGiftScreen } from './screens/create-gift';
import { HomeScreen } from './screens/home';
import { HomeGiftsScreen } from './screens/home-gifts';
import { LoginScreen } from './screens/login';

/**
 * NOTE: We use `children` in Routes rather than the `component` prop for the
 * sake of type-safety. Otherwise the type-checker won't be able to enforce
 * that we've passed the correct props into the rendered component.
 * (Alternatively, could use `render` prop).
 */

export const Main: React.FC = () => (
  <Router>
    <Switch>

      <Route exact={true} path='/'>
        <HomeScreen />
      </Route>

      <Route exact={true} path='/testing'>
        <UnderConstruction />
      </Route>

      <Route exact={true} path='/your-gifts'>
        <HomeGiftsScreen />
      </Route>

      <Route exact={true} path='/sign-in'>
        <LoginScreen />
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
