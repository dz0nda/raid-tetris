/* eslint-disable no-unused-vars */
export const initialStateEvents = [
  {
    action: 'connecting',
    dispatch: (_store, _next, _action) => (_socket) => {
      console.log('Socket is connecting.');
    },
  },
  {
    action: 'connect',
    dispatch: (_store, _next, _action) => (_socket) => {
      console.log('Socket connected.');
    },
  },
  {
    action: 'disconnect',
    dispatch: (_store, _next, _action) => (_socket) => {
      console.log('Socket disconnected.');
    },
  },
  {
    action: 'reconnecting',
    dispatch: (_store, _next, _action) => (_socket) => {
      console.log('Socket reconnecting.');
    },
  },
];

export default initialStateEvents;
