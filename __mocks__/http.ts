import { Server } from 'http';

const mockListen = jest.fn(function (
  this: Server,
  port?: number,
  hostname?: string,
  backlog?: number,
  listeningListener?: () => void,
) {
  if (listeningListener) listeningListener();
  return this;
});

const mockClose = jest.fn(function (this: Server, callback: (err?: Error) => void) {
  callback();
  return this;
});

const mockServer: Server = {
  listen: mockListen,
  close: mockClose,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

export const createServer = jest.fn(() => mockServer);
