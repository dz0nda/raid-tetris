import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import app from './app';
import player from './player';
import game from './game';

const rootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    app,
    game,
    player,
  });

export default rootReducer;
