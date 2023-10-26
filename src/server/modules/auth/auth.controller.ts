import passport from 'passport';

import ev from '@/shared/events';
import { Request } from '@/server/modules/utils/types';
import { AuthService } from './auth.service';
import { LoginDto, LogoutDto } from './auth.dto';
import { Logger } from '../utils/utils';
import { loginSchema } from './auth.schema';
import { SocketService } from '../socket/socket.service';
import { Controller } from '../module/module.controller';

/**
 * AuthController manages authentication-related routes and their corresponding handlers.
 */
export class AuthController extends Controller {
  /**
   * Constructs an instance of AuthController.
   * Initializes the authentication-related routes.
   *
   * @param authService - AuthService instance for managing authentication logic.
   * @param socketService - SocketService instance for socket-related operations.
   */
  constructor(private readonly authService: AuthService, private readonly socketService: SocketService) {
    super('AuthController');

    this._routes = [
      {
        event: { req: ev.REQUEST_LOGIN, res: ev.RESPONSE_LOGIN },
        handler: this.login.bind(this),
        auth: null,
        schema: loginSchema,
      },
      {
        event: { req: ev.REQUEST_LOGOUT, res: ev.RESPONSE_LOGOUT },
        handler: this.logout.bind(this),
        auth: this.authService.validateLoggedUser.bind(this.authService),
        schema: null,
      },
    ];
  }

  private authenticateWithStrategy(strategy: string, req: Request<LoginDto>): void {
    passport.authenticate(strategy, (err: any, user: any, info: any) => {
      if (err) throw err;

      if (!user) {
        this.socketService.emitToSocket(req.socket.id, ev.RESPONSE_LOGIN, {
          status: 401,
          payload: { user: null },
        });
      } else {
        req.socket.raw.data.user = user;

        this.socketService.emitToSocket(req.socket.id, ev.RESPONSE_LOGIN, {
          status: 200,
          payload: { user },
        });
      }
    })({ body: req.data } as any, {} as any, {} as any);
  }

  /**
   * Handles login requests.
   * If successful, emits a login response to the requester socket with user information.
   *
   * @param req - The login request containing user credentials and socket details.
   */
  public async login(req: Request<LoginDto>): Promise<void> {
    try {
      this.log(`Socket ${req.socket.id} attempting to log in`);

      this.authService.login(req.socket, req.data);

      this.socketService.emitToSocket(req.socket.id, ev.RESPONSE_LOGIN, {
        status: 200,
        payload: { user: { username: req.data.username } },
      });
    } catch (err) {
      Logger.error(err);
      this.socketService.emitToSocket(req.socket.id, ev.RESPONSE_LOGIN, {
        status: 500,
        payload: { user: { username: '' } },
      });
    }
  }

  /**
   * Handles logout requests.
   * TODO: Implement the logout logic and emit relevant responses.
   *
   * @param req - The logout request containing the user details and socket information.
   */
  public async logout(req: Request<LogoutDto>): Promise<void> {
    try {
      this.log(`Socket ${req.socket.id} attempting to log out`);

      console.log(req.user);
      // console.log(req.socket.raw.data.user);
      await this.authService.logout(req.socket.id, req.user!);

      this.socketService.emitToSocket(req.socket.id, ev.RESPONSE_LOGOUT, {
        status: 200,
        payload: { user: null },
      });
    } catch (err) {
      Logger.error(err);
      this.socketService.emitToSocket(req.socket.id, ev.RESPONSE_LOGOUT, {
        status: 500,
        payload: { user: null },
      });
    }
  }
}
