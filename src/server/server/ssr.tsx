import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { StaticRouter, matchPath } from 'react-router-dom';
import { rootReducer, middleware } from '@client/store';

import App from '@client/App';
import Game from '@client/pages/Game';
// import routes from '../src/routes';
import { Request } from 'express';

const getInitialData = () => {
  // if (activeRoute?.component.getInitialProps) {
  //   const requestInitialData = activeRoute.component.getInitialProps();
  //   return Promise.resolve(requestInitialData).then((initialData) => initialData);
  // }
  const initialProps = Game.getInitialProps();
  return Promise.resolve(initialProps).then((initialData) => initialData);
};

const ssr = async (req: Request) => {
  // const activeRoute = routes.find((route) => matchPath(req.url, route));
  const initialProps = await getInitialData();

  const store = createStore(rootReducer, applyMiddleware(...middleware));
  // const context = { initialProps };
  let content = renderToString(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  const preloadedState = store.getState();

  return { content, preloadedState, initialProps };
};

export default ssr;
