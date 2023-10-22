import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { RoomModule } from '../room/room.module';
import { SocketService } from '../socket/socket.service';

export class AuthModule {
  public service: AuthService;
  public controller: AuthController;

  constructor() {
    const userModule = new UserModule();
    const roomModule = new RoomModule({} as SocketService);
    this.service = new AuthService(userModule.service, roomModule.service);
    this.controller = new AuthController(this.service);
  }
}
