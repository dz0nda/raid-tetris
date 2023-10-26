import { RedTetris } from './app';
import { SocketModule } from './modules/socket/socket.module';
import { RoomModule } from './modules/room/room.module';
import { ChatsModule } from './modules/chats/chats.module';
import { AuthModule } from './modules/auth/auth.modules';

// Mocking the various modules

jest.mock('./modules/socket/socket.module', () => ({
  SocketModule: jest.fn().mockImplementation(() => ({
    service: {
      ioOn: jest.fn(),
      connect: jest.fn(),
      listen: jest.fn(),
    },
    controller: {
      getRoutes: [],
    },
  })),
}));

jest.mock('./modules/rooms/rooms.module', () => ({
  RoomModule: jest.fn().mockImplementation(() => ({
    service: {},
    controller: {
      getRoutes: [],
    },
  })),
}));

jest.mock('./modules/chats/chats.module', () => ({
  ChatsModule: jest.fn().mockImplementation(() => ({
    service: {},
    controller: {
      getRoutes: [],
    },
  })),
}));

jest.mock('./modules/auth/auth.modules', () => ({
  AuthModule: jest.fn().mockImplementation(() => ({
    service: {},
    controller: {
      getRoutes: [],
    },
  })),
}));

describe('RedTetris', () => {
  let redTetris: RedTetris;

  beforeEach(() => {
    redTetris = new RedTetris('localhost', 3000);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('initializes the SocketModule', () => {
    expect(SocketModule).toHaveBeenCalledWith('localhost', 3000);
    expect(redTetris.socket.service.ioOn).toHaveBeenCalledWith(expect.any(Function));
  });

  it('initializes the RoomModule', () => {
    expect(RoomModule).toHaveBeenCalledWith(redTetris.socket.service);
  });

  it('initializes the ChatsModule', () => {
    expect(ChatsModule).toHaveBeenCalledWith(redTetris.socket.service);
  });

  it('initializes the AuthModule', () => {
    expect(AuthModule).toHaveBeenCalledWith(redTetris.rooms.service, redTetris.chats.service);
  });

  it('combines the routes from all modules', () => {
    expect(redTetris.routes).toEqual([]);
  });

  it('routes socket events to the appropriate handlers', () => {
    const mockHandler = jest.fn();
    const mockSocketIo = { on: jest.fn() };
    const wrappedSocket = {
      value: jest.fn().mockReturnValue({
        on: jest.fn(),
        emitToSocket: jest.fn(),
        getSocketId: 'test-socket-id',
      }),
    };

    jest.mock('./modules/socket/socket.entity', () => ({
      Socket: jest.fn().mockImplementation(() => wrappedSocket),
    }));

    redTetris.routes = [
      {
        event: {
          req: 'test-event-req',
          res: 'test-event-res',
        },
        handler: mockHandler,
        auth: undefined,
        schema: undefined,
      },
    ];

    redTetris._router(redTetris.socket.service.io, mockSocketIo as any);

    // Ensure the socket event is set up correctly
    expect(mockSocketIo.on).toHaveBeenCalledWith('test-event-req', expect.any(Function));

    // Get the registered event handler and execute it
    const eventHandler = mockSocketIo.on.mock.calls[0][1];
    eventHandler({ test: 'data' }, jest.fn());

    // Check if the mockHandler was called correctly
    expect(mockHandler).toHaveBeenCalledWith(
      { socket: expect.objectContaining({ getSocketId: 'test-socket-id' }), data: { test: 'data' } },
      { io: redTetris.socket.service.io, callback: expect.any(Function) },
    );
  });

  it('listens on the specified port', () => {
    redTetris.listen();
    expect(redTetris.socket.service.listen).toHaveBeenCalled();
  });
});
