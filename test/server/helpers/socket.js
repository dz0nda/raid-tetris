import { io } from "socket.io-client";

// initSocket returns a promise
// success: resolve a new socket object
// fail: reject a error
export const initSocket = (port) =>
  new Promise((resolve, reject) => {
    // create socket for communication
    const socket = io(`localhost:${port}`, {
      'reconnection delay': 0,
      'reopen delay': 0,
      'force new connection': true,
    });

    // define event handler for sucessfull connection
    socket.on('connect', () => {
      logger.info('connected');
      resolve(socket);
    });

    // if connection takes longer than 5 seconds throw error
    setTimeout(() => {
      reject(new Error('Failed to connect wihtin 5 seconds.'));
    }, 10000);
  });

// destroySocket returns a promise
// success: resolve true
// fail: resolve false
export const destroySocket = (socket) =>
  new Promise((resolve) => {
    // check if socket connected
    if (socket.connected) {
      // disconnect socket
      // logger.info('disconnecting...');
      socket.disconnect();
      resolve(true);
    } else {
      // not connected
      // logger.info('no connection to break...');
      resolve(false);
    }
  });

export const handleResponse = (socket, event) => {
  return new Promise((resolve) => {
    socket.on(event, (data) => {
      resolve(data);
    });
  });
};
