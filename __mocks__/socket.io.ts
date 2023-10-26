const mockIoOn = jest.fn();
const mockIoIn = jest.fn(() => ({
  emit: jest.fn(),
}));
const mockIoTo = jest.fn(() => ({
  emit: jest.fn(),
}));

const mockSocketIoServer = {
  on: mockIoOn,
  in: mockIoIn,
  to: mockIoTo,
} as unknown as typeof import('socket.io').Server;

export const Server = jest.fn(() => mockSocketIoServer);
