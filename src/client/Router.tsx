import React, { FC } from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';

import { Login } from './pages/Login';
import { Game } from './pages/Game';
import { history } from './store';

export const Router: FC = () => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/:room[:name]" component={Game} />
        <Route path="/" component={Login} />
      </Switch>
    </ConnectedRouter>
  );
};
