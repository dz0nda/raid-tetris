import ev from '@/shared/events';
import { Route } from '@/server/server/SocketServer';
import { loginSchema } from '@/server/redtetris.validation';
import { AuthService } from './auth.service';

export class AuthController {
  routes: Route[];

  constructor(service: AuthService) {
    this.routes = [
      {
        event: { req: ev.REQUEST_LOGIN_USER, res: ev.RESPONSE_LOGIN_USER },
        handler: service.loginUser.bind(this),
        auth: false,
        schema: null,
      },
      {
        event: { req: ev.REQUEST_LOGIN, res: ev.RESPONSE_LOGIN },
        handler: service.login.bind(this),
        auth: false,
        schema: loginSchema,
      },
      {
        event: { req: ev.REQUEST_LOGOUT, res: ev.RESPONSE_LOGOUT },
        handler: service.logout.bind(this),
        auth: true,
        schema: null,
      },
    ];
  }
}
