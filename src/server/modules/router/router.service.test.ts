import { Socket as SocketIo } from 'socket.io';
import Redis from 'ioredis';
import { RouterService } from './router.service';
import { SocketService } from '../socket/socket.service';
import { Logger } from '@/modules/utils/utils';
import { HttpService } from '@/modules/http/http.service';
import { DatabaseService } from '@/modules/database/database.service';

// jest.mock('@/modules/socket/socket.service');
// jest.mock('@/modules/utils/utils');
// jest.mock('@/modules/database/@/modules/http/http.service');
jest.mock('@/modules/database/database.service');

describe('RouterService', () => {
  let socketServiceMock: jest.Mocked<SocketService>;
  let routerService: RouterService;
  const mockRoutes = [
    {
      event: { req: 'testEvent', res: 'testEventResponse' },
      handler: jest.fn(),
      schema: { validate: jest.fn() },
    },
  ];

  beforeEach(() => {
    const mockRedis = new Redis() as jest.Mocked<Redis>;
    const mockDbService = new DatabaseService(mockRedis);
    const httpServiceMock = new HttpService();
    socketServiceMock = new SocketService(mockDbService, httpServiceMock) as jest.Mocked<SocketService>;
    routerService = new RouterService(socketServiceMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be correctly instantiated', () => {
    expect(routerService).toBeInstanceOf(RouterService);
  });

  it('should add routes', () => {
    routerService.addRoutes(mockRoutes);
    // Here, you'd have a way to validate that routes have been added.
    // This will depend on whether you have any methods or properties exposed that provide this info.
    // For the purpose of this example, if you had a method `getRoutes`:
    // expect(routerService.getRoutes()).toEqual(mockRoutes);
  });

  it('should setup socket routing and connect the socket', () => {
    const socketMock = {} as SocketIo;
    socketServiceMock.ioOn.mockImplementation((callback) => callback(socketMock));
    routerService = new RouterService(socketServiceMock); // Re-instantiate to trigger setup
    expect(socketServiceMock.connect).toHaveBeenCalledWith(socketMock);
  });

  it('should route requests based on events', () => {
    const socketMock = {
      on: jest.fn(),
    } as unknown as SocketIo;

    socketServiceMock.ioOn.mockImplementation((callback) => callback(socketMock));
    routerService.addRoutes(mockRoutes);
    routerService = new RouterService(socketServiceMock); // Re-instantiate to trigger routing setup

    expect(socketMock.on).toHaveBeenCalledWith(mockRoutes[0].event.req, expect.any(Function));
  });

  it('should handle valid data and invoke handler', () => {
    const socketMock = {
      on: jest.fn((event, callback) => callback({}, jest.fn())),
    } as unknown as SocketIo;
    mockRoutes[0].schema.validate.mockReturnValue({ error: null });

    socketServiceMock.ioOn.mockImplementation((callback) => callback(socketMock));
    routerService.addRoutes(mockRoutes);
    routerService = new RouterService(socketServiceMock); // Re-instantiate to trigger routing setup

    expect(mockRoutes[0].handler).toHaveBeenCalled();
  });

  it('should handle invalid data and not invoke handler', () => {
    const socketMock = {
      on: jest.fn((event, callback) => callback({}, jest.fn())),
    } as unknown as SocketIo;
    mockRoutes[0].schema.validate.mockReturnValue({ error: new Error('Invalid data') });

    socketServiceMock.ioOn.mockImplementation((callback) => callback(socketMock));
    routerService.addRoutes(mockRoutes);
    routerService = new RouterService(socketServiceMock); // Re-instantiate to trigger routing setup

    expect(mockRoutes[0].handler).not.toHaveBeenCalled();
    expect(Logger.error).toHaveBeenCalled();
  });
});
