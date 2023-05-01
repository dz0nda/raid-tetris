import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { History } from 'history';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { connectRouter, routerMiddleware as connectedRouterMiddleware } from 'connected-react-router';
import { createHashHistory } from 'history';

// import rootReducer from '../reducers'
import { logger } from '@/client/middlewares/logger';
import { notificationsMiddleware } from '@/client/middlewares/notifications';
import { routerMiddleware } from '@/client/middlewares/router';
import socketIoMiddleware from '@/client/middlewares/socketIo';
import { socketReducer } from './reducers/socket';
import { appReducer } from './reducers/app';

export const history = createHashHistory();

export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    socket: socketReducer,
    app: appReducer,
    // game: gameReducer,
    // player: playerReducer,
  });

// export const middleware = [routerMiddleware(history), thunk, loggerMiddleware, socketIoMiddleware];

// const store = createStore(rootReducer(history), applyMiddleware(...middleware));

// export default store;

export const store = configureStore({
  // Automatically calls `combineReducers`
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      connectedRouterMiddleware(history),
      socketIoMiddleware,
      notificationsMiddleware,
      logger,
      routerMiddleware,
    ]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
