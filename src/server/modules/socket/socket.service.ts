import { Socket as SocketIo, Server as SocketIoServer } from 'socket.io';
import RedisStore from 'connect-redis';
import session from 'express-session';
import passport from 'passport';

import { Base } from '@/modules/utils/service';
import { HttpService } from '@/modules/http/http.service';

import { ISocketRepository } from './socket.repository';
import { Socket } from './socket.helper';

const SESSION_SECRET = 'cats';
const PING_INTERVAL = 5000;
const PING_TIMEOUT = 15000;
const REDIS_PREFIX = 'raid-tetris:';

/**
 * Service to manage and interact with sockets.
 */
export class SocketService extends Base {
  io: SocketIoServer;

  /**
   * Constructor to initialize the socket service.
   *
   * @param socketRepository - The repository to manage socket entities.
   * @param httpService - The service to obtain the underlying HTTP server.
   */
  constructor(private readonly socketRepository: ISocketRepository, httpService: HttpService) {
    super('SocketService');
    this.io = new SocketIoServer(httpService.getHttp(), {
      pingInterval: PING_INTERVAL,
      pingTimeout: PING_TIMEOUT,
    });

    this.initializeAuthentication();
  }

  /**
   * Middleware wrapper to adapt express middleware for socket.io.
   *
   * @param middleware - The express middleware to wrap.
   * @returns - The adapted middleware for socket.io.
   */
  private wrap(middleware: any) {
    return (socket: SocketIo, next: (err?: any) => void) => middleware(socket.request, {}, next);
  }

  /**
   * Initialize the necessary authentication middlewares for socket.io.
   */
  private initializeAuthentication(): void {
    this.io.use(
      this.wrap(
        session({
          store: new RedisStore({ client: this.socketRepository.service.db, prefix: REDIS_PREFIX }),
          resave: false,
          saveUninitialized: true,
          secret: SESSION_SECRET,
        }),
      ),
    );

    this.io.use(this.wrap(passport.initialize()));
    this.io.use(this.wrap(passport.session()));
  }

  /**
   * Getter to provide access to the underlying socket repository.
   *
   * @returns - The socket repository.
   */
  get repository(): ISocketRepository {
    return this.socketRepository;
  }

  /**
   * Handles the initial connection of a socket.
   *
   * @param socket - The newly connected socket instance.
   */
  public connect(socket: Socket): void {
    const session = socket.raw.request.session;

    if (!session) {
      this.log(`Socket ${socket.id} connected without session.`);
      return;
    }

    session.user = { socketId: socket.id };
    session.save();

    this.log(`Socket ${socket.id} connected.`);
  }

  /**
   * Handles the event when a socket is about to disconnect.
   *
   * @param socket - The disconnecting socket instance.
   */
  public disconnecting(socket: SocketIo): void {
    this.log(`Socket ${socket.id} is disconnecting...`);
  }

  /**
   * Handles the event when a socket has fully disconnected.
   *
   * @param socket - The disconnected socket instance.
   */
  public disconnect(socket: SocketIo): void {
    this.log(`Socket ${socket.id} diconnected.`);
    this.socketRepository.deleteSocket(socket.id);
  }

  /**
   * Registers a callback for the 'connection' event.
   *
   * @param callback - The callback to be executed when a socket connects.
   */
  public ioOn(callback: (socket: SocketIo) => void): void {
    this.io.on('connect', callback);
  }

  /**
   * Emits data to a specific room.
   *
   * @param room - The target room.
   * @param event - The event name.
   * @param data - The data to emit.
   */
  public emitToRoom(room: string, event: string, data: any): void {
    this.io.in(room).emit(event, data);
  }

  /**
   * Emits data to a specific socket.
   *
   * @param id - The target socket ID.
   * @param event - The event name.
   * @param data - The data to emit.
   */
  public emitToSocket(id: string, event: string, data: any): void {
    this.io.to(id).emit(event, data);
  }
}
