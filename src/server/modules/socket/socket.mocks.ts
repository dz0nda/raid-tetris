import { ISocketRepository } from './socket.repository';

export const createMockedSocketRepository = (): jest.Mocked<ISocketRepository> => {
  return {
    setSocket: jest.fn(),
    getSocket: jest.fn(),
    deleteSocket: jest.fn(),
  };
};
