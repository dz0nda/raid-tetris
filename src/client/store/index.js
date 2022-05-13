import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

import rootReducer from '../reducers';
import socketIoMiddleware from '../middleware/socketIoMiddleware';

export const history = createHashHistory();
export const middleware = [routerMiddleware(history), thunk, socketIoMiddleware];

const store = createStore(rootReducer(history), applyMiddleware(...middleware));

export default store;
