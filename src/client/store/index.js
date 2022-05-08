import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger';
// import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

import rootReducer from '../reducers';
import socketIoMiddleware from '../middleware/socketIoMiddleware';

export let history = null;
let middleware = [thunk, socketIoMiddleware];

// const logger = createLogger();
// if (typeof document !== 'undefined') {
  history = createHashHistory();
  middleware = [routerMiddleware(history), ...middleware];
// }

// if (process.env.NODE_ENV === 'development') {
//   middleware = [...middleware, logger];
// }

const store = createStore(rootReducer(history), applyMiddleware(...middleware));

export default store;
