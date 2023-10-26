import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SocketService } from '../socket/socket.service';
import { UserService } from '../user/user.service';

export class AuthModule {
  public service: AuthService;
  public controller: AuthController;

  constructor(socketService: SocketService, userService: UserService) {
    this.service = new AuthService(socketService, userService);
    this.controller = new AuthController(this.service, socketService);
  }
}
