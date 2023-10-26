import { DatabaseService } from '@/modules/database/database.service';
import { sha256 } from '../utils/crypto';
import { User } from './user.entity';

export interface IUserRepository {
  setUser(user: User): Promise<void>;
  getUser(id: string): Promise<User | null>;
  deleteUser(id: string): Promise<void>;
}

export class UserRepository implements IUserRepository {
  constructor(private dbService: DatabaseService) {}

  /**
   * Inserts or updates a user in the database.
   * @param user User object to set in the database.
   */
  async setUser(user: User): Promise<void> {
    const id = sha256(user.username);
    this.dbService.set('user', id, user);
  }

  /**
   * Retrieves a user by its id.
   * @param id The user's id.
   * @returns The User object or null if not found.
   */
  async getUser(id: string): Promise<User | null> {
    return this.dbService.get<User>('user', id);
  }

  /*
   * Delete a user by its id.
   *
   * @param id The user's id.
   * @returns The User object or null if not found.
   */
  async deleteUser(id: string): Promise<void> {
    return this.dbService.del('user', id);
  }
}
