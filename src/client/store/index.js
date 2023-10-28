import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

import params from '../../shared/params';
import rootReducer from '../reducers';
import socketIo from '../middleware/socketIo';

export const history = createHashHistory();
export const middleware = [routerMiddleware(history), thunk, socketIo(params.socket.id)];

const store = createStore(rootReducer(history), applyMiddleware(...middleware));

export default store;
