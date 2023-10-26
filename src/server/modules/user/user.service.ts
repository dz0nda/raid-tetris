import { SocketService } from '../socket/socket.service';
import { sha256 } from '../utils/crypto';

import { User } from './user.entity';
import { IUserRepository } from './user.repository';

export class UserService {
  constructor(private readonly userRepository: IUserRepository, private readonly socketService: SocketService) {}

  /**
   * Inserts or updates a user in the database.
   *
   * @param user User object to set in the database.
   *
   * @returns The User object.
   */
  public async createOrUpdateUser(user: User): Promise<void> {
    return this.userRepository.setUser(user);
  }

  /**
   * Fetchs a user by its id.
   *
   * @param id The user's id.
   *
   * @returns The User object or null if not found.
   */
  public async getUserById(id: string): Promise<User | null> {
    return this.userRepository.getUser(id);
  }

  /**
   * Fetchs a user by its name.
   *
   * @param name The user's name.
   *
   * @returns The User object or null if not found.
   */
  public async getUserByName(name: string): Promise<User | null> {
    const id = sha256(name);
    return this.userRepository.getUser(id);
  }

  /**
   * Retrieves the logged-in user and logs the process.
   *
   * @param name The user's name.
   *
   * @returns An object with the user's id and User object or null if not found.
   */
  async getLoggedUser(socketId: string): Promise<User | null> {
    const socket = await this.socketService.repository.getSocket(socketId);
    if (!socket || !socket.userId) {
      return null;
    }

    const id = socket.userId;
    return this.userRepository.getUser(id);
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
