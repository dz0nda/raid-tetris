import { DatabaseService } from '@/modules/database/database.service';
import { SocketService } from '@/modules/socket/socket.service';

import { UserService } from './user.service';
import { UserRepository } from './user.repository';

export class UserModule {
  public readonly service: UserService;

  constructor(dbService: DatabaseService, socketService: SocketService) {
    const userRepo = new UserRepository(dbService);
    this.service = new UserService(userRepo, socketService);
  }
}
