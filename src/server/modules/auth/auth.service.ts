import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';
import { User, UserRole } from '../user/user.entity';
import { sha256 } from '../utils/crypto';
import { SocketService } from '../socket/socket.service';
import { Socket } from '../socket/socket.helper';

export class AuthService {
  constructor(private readonly socketService: SocketService, private readonly userService: UserService) {
    this.initializePassportStrategies();
  }

  private initializePassportStrategies(): void {
    passport.use(
      UserRole.ANONYMOUS,
      new LocalStrategy({ usernameField: 'userId', passwordField: 'password' }, async (username, _, done) => {
        const user = await this.userService.getUserByName(username);
        if (user) {
          return done(null, { username: username, role: 'ANONYMOUS' });
        }

        return done(null, false);
      }),
    );

    passport.use(
      UserRole.USER,
      new LocalStrategy({ usernameField: 'username', passwordField: 'password' }, async (username, password, done) => {
        const user = await this.userService.getUserByName(username);

        if (user && user.password === sha256(password)) {
          return done(null, user);
        }
        return done(null, false);
      }),
    );

    // // ROOM Strategy (example, adjust as needed)
    // passport.use(
    //   'room',
    //   new LocalStrategy({ usernameField: 'username', passwordField: 'room' }, async (username, room, done) => {
    //     const roomUser = await RoomUser.find({ username, room }); // pseudocode
    //     if (roomUser) {
    //       return done(null, roomUser);
    //     }
    //     return done(null, false);
    //   }),
    // );
  }

  /**
   * Logs in a user.
   * If the user does not exist, it creates a new user.
   * If the user exists, it checks the password and logs in the user.
   *
   * @param dto - Data transfer object containing user's name and password.
   * @param socketId - The socket ID of the user.
   * @returns The logged-in user.
   * @throws Error if the password is invalid or if the user is already logged in.
   */
  async login(socket: Socket, dto: LoginDto): Promise<User> {
    const { username, password } = dto;
    let user = await this.userService.getUserByName(username);

    if (!user) {
      user = new User(sha256(username), username, password);
      await this.userService.createOrUpdateUser(user);
    }

    if (user.password && (!password || !user.checkPassword(sha256(password)))) {
      throw new Error('Invalid password.');
    }

    const session = socket.raw.request.session;
    if (session) {
      session.user = { id: user.id, username };
      session.save((err) => {
        if (err) {
          throw new Error('Error saving the session');
        }
      });
    }

    return user;
  }

  /*
   * Logs out a user.
   *
   * @param user - The user to log out.
   */
  async logout(socketId: string, user: User): Promise<void> {
    user.socketId = undefined;
    await this.userService.createOrUpdateUser(user);

    await this.socketService.repository.deleteSocket(socketId);
  }

  /**
   * Validates a logged-in user.
   *
   * @param socketId - The socket ID of the user.
   *
   * @returns The logged-in user.
   *
   * @throws Error if the user is not logged in.
   */
  async validateLoggedUser(socketId: string): Promise<User> {
    const user = await this.userService.getLoggedUser(socketId);
    if (!user) {
      throw new Error('User is not logged.');
    }

    return user;
  }

  /*
   * Validates if a user is in a room.
   *
   * @param socketId - The socket ID of the user.
   * @param roomId - The room ID.
   *
   * @returns The room if the user is in the room.
   *
   * @throws Error if the user is not in the room.
   */
  public async validateUserInRoom(socketId: string, roomId: string) {
    const user = await this.validateLoggedUser(socketId);

    if (user.roomId !== roomId) {
      throw new Error('User is not in the room.');
    }

    return user;
  }
}
