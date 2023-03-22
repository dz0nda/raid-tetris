import thunk from 'redux-thunk';
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

// import rootReducer from '../reducers'
import loggerMiddleware from './middlewares/logger';
import socketIoMiddleware from './middlewares/socketIo';
import app from './reducers/app';
import game from './reducers/game';
import player from './reducers/player';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app,
    game,
    player,
  });

export const history = typeof window !== 'undefined' ? createHashHistory() : {};

export const middleware = [routerMiddleware(history), thunk, loggerMiddleware, socketIoMiddleware];

const store = createStore(rootReducer(history), applyMiddleware(...middleware));

export default store;
