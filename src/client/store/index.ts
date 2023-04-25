import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

// import rootReducer from '../reducers'
import { logger } from './middlewares/logger';
import { notificationsMiddleware } from './middlewares/notifications';
import socketIoMiddleware from './middlewares/socketIo';
import { appReducer } from './reducers/app';
import { gameReducer } from './reducers/game';
import { playerReducer } from './reducers/player';

// export const rootReducer = (history) =>
//   combineReducers({
//     router: connectRouter(history),
//     appReducer,
//     gameReducer,
//     playerReducer,
//   });

export const history = typeof window !== 'undefined' ? createHashHistory() : {};

// export const middleware = [routerMiddleware(history), thunk, loggerMiddleware, socketIoMiddleware];

// const store = createStore(rootReducer(history), applyMiddleware(...middleware));

// export default store;

export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: {
    router: connectRouter(history),
    app: appReducer,
    game: gameReducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(logger)
      .concat([routerMiddleware(history), socketIoMiddleware, notificationsMiddleware]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
