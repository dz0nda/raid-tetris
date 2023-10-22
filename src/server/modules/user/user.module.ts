import { UserService } from './user.service';
import { DatabaseModule } from '../database/database.module';

export class UserModule {
  public service: UserService;

  constructor() {
    const dbModule = DatabaseModule.getInstance();
    this.service = new UserService(dbModule.service);
  }
}
