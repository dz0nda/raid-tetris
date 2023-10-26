import { SocketService } from './socket.service';
import { SocketEntity } from './socket.entity';

import { createMockedHttpService } from '@/modules/http/__mocks__/http.service'; // Assuming you have a utility to mock the http service.
import { createMockedSocketRepository } from './__mocks__/socket.repository'; // Assuming you have a utility to mock the repository.

jest.mock('socket.io', () => ({
  Server: jest.fn(() => ({
    on: jest.fn(),
    in: jest.fn(() => ({ emit: jest.fn() })),
    to: jest.fn(() => ({ emit: jest.fn() })),
  })),
}));

describe('SocketService', () => {
  let socketService: SocketService;
  let mockSocketRepo: ReturnType<typeof createMockedSocketRepository>;
  let mockHttpService: ReturnType<typeof createMockedHttpService>;

  beforeEach(() => {
    mockSocketRepo = createMockedSocketRepository();
    mockHttpService = createMockedHttpService();
    socketService = new SocketService(mockSocketRepo, mockHttpService);
  });

  it('should handle connect event', () => {
    const mockSocket = { id: '123' } as any;
    socketService.connect(mockSocket);
    expect(mockSocketRepo.setSocket).toHaveBeenCalledWith(new SocketEntity('123'));
  });

  it('should handle disconnecting event', () => {
    const mockSocket = { id: '123' } as any;
    socketService.disconnecting(mockSocket);
    // Just logging, maybe check if log function has been called
  });

  it('should handle disconnect event', () => {
    const mockSocket = { id: '123' } as any;
    socketService.disconnect(mockSocket);
    expect(mockSocketRepo.deleteSocket).toHaveBeenCalledWith('123');
  });

  it('should handle ioOn', () => {
    const mockCallback = jest.fn();
    socketService.ioOn(mockCallback);
    expect(socketService.io.on).toHaveBeenCalledWith('connection', mockCallback);
  });

  it('should handle emitToRoom', () => {
    const mockData = { msg: 'Hello' };
    socketService.emitToRoom('room123', 'test-event', mockData);
    expect(socketService.io.in).toHaveBeenCalledWith('room123');
    expect(socketService.io.in('room123').emit).toHaveBeenCalledWith('test-event', mockData);
  });

  it('should handle emitToSocket', () => {
    const mockData = { msg: 'Hello' };
    socketService.emitToSocket('123', 'test-event', mockData);
    expect(socketService.io.to).toHaveBeenCalledWith('123');
    expect(socketService.io.to('123').emit).toHaveBeenCalledWith('test-event', mockData);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
