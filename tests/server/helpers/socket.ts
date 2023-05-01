import { Socket, io } from 'socket.io-client';

// initSocket returns a promise
// success: resolve a new socket object
// fail: reject a error
export const initSocket = (port: number): Promise<Socket> =>
  new Promise((resolve, reject) => {
    // create socket for communication
    const socket = io(`http://0.0.0.0:${port}`, {
      transports: ['websocket'],
    });

    // define event handler for sucessfull connection
    socket.on('connect', () => {
      resolve(socket);
    });

    // if connection takes longer than 5 seconds throw error
    // setTimeout(() => {
    //   reject(new Error('Failed to connect wihtin 5 seconds.'));
    // }, 10000);
  });

// destroySocket returns a promise
// success: resolve true
// fail: resolve false
export const destroySocket = (socket: Socket): Promise<boolean> =>
  new Promise((resolve) => {
    // check if socket connected
    if (socket && socket.connected) {
      // disconnect socket
      socket.disconnect();
      resolve(true);
    } else {
      // not connected
      resolve(false);
    }
  });

export const handleResponse = (socket: Socket, event: string): Promise<any> => {
  return new Promise((resolve) => {
    socket.on(event, (data) => {
      resolve(data);
    });

    // if connection takes longer than 5 seconds throw error
    // setTimeout(() => {
    //   reject(new Error('Failed to connect wihtin 5 seconds.'));
    // }, 10000);
  });
};
