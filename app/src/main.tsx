import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { UnderConstruction } from './screens/under-construction';
import { NotFound } from './screens/not-found';
import { ReceiveGiftScreen } from './screens/receive-gift';

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
        <UnderConstruction />
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
