import { DatabaseService } from '@/modules/database/database.service';
import { sha256 } from '../utils/crypto';
import { Logger } from '../utils/utils';

import { User } from './user.entity';

export class UserService {
  constructor(private dbService: DatabaseService) {}

  // private async sha256(key: string): Promise<string> {
  //   return bcrypt.hash(key, 10);
  // }

  async setUser(user: User): Promise<void> {
    const id = sha256(user.name);
    Logger.info(`setUser: ${user.name}`);
    Logger.info(`setUser: ${id}`);
    Logger.info(`getLoggedUser: ${JSON.stringify(user)}`);
    this.dbService.set('user', id, user);
  }

  async getUser(id: string): Promise<User | null> {
    return this.dbService.get<User>('user', id);
  }

  async getLoggedUser(name: string): Promise<{ id: string; user: User } | null> {
    const id = sha256(name);
    Logger.info(`getLoggedUser: ${name}`);
    Logger.info(`getLoggedUser: ${id}`);
    const user = await this.getUser(id);
    Logger.info(`getLoggedUser: ${JSON.stringify(user)}`);
    if (!user || !user.socketId) {
      return null;
    }

    return { id, user };
  }

  // async getOrCreateUser(name: string, password?: string): Promise<User> {
  //   const id = this.generateUserId(name);
  //   let user = await this.getUserById(id);

  //   if (!user) {
  //     user = await this.createUser(new User(name, password));
  //   }

  //   return user;
  // }

  // ... other CRUD methods
}
