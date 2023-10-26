import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { History } from 'history';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { connectRouter, routerMiddleware as connectedRouterMiddleware } from 'connected-react-router';
import { createHashHistory, createMemoryHistory } from 'history';

// Middlewares
import { notificationsMiddleware } from '@/client/middlewares/notifications';
import { routerMiddleware } from '@/client/middlewares/router';
import { socketioMiddleware } from '@/client/middlewares/socketIo/socket.middleware';

// Reducers
import userReducer from './slices/user.slice';
import roomReducer from './slices/room.slice';
import playerReducer from './slices/player.slice';
import chatReducer from './slices/chat.slice';

// Create history based on the environment
export const history = process.env.NODE_ENV === 'test' ? createMemoryHistory() : createHashHistory();

// Root reducer combining all individual reducers
export const rootReducer = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    user: userReducer,
    room: roomReducer,
    player: playerReducer,
    chat: chatReducer,
  });

// Configure store with reducers and middlewares
export const store = configureStore({
  reducer: rootReducer(history),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(
      connectedRouterMiddleware(history),
      socketioMiddleware(),
      notificationsMiddleware,
      routerMiddleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
