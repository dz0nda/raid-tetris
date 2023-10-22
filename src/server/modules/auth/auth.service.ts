import { Request } from '@/modules/utils/types';

import { UserService } from '../user/user.service';
import { JoinRoomDto, LoginDto } from './auth.dto';
import { User } from '../user/user.entity';
import { RoomService } from '../room/room.service';
import { sha256 } from '../utils/crypto';

export class AuthService {
  userService: UserService;
  roomService: RoomService;

  constructor(userService: UserService, roomService: RoomService) {
    this.userService = userService;
    this.roomService = roomService;
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
  async login(dto: LoginDto, socketId: string): Promise<User> {
    const { name, password } = dto;
    const id = sha256(name);
    let user = await this.userService.getUser(id);

    if (!user) {
      user = new User(name, password);
      await this.userService.setUser(user);
    }

    if (user.socketId) {
      throw new Error('User already logged in.');
    }

    user.socketId = socketId;
    await this.userService.setUser(user);

    return user;
  }

  /*
   *  Join Room
   */
  async joinRoom(dto: JoinRoomDto) {
    const { name, room: roomName, pass } = dto;

    const res = await this.userService.getLoggedUser(name);
    if (!res) {
      throw new Error('User is not logged.');
    }

    const { id, user } = res;
    if (user.room) {
      throw new Error('User already in a room.');
    }

    const room = await this.roomService.joinRoom(id, roomName, pass);

    user.room = roomName;
    await this.userService.setUser(user);

    return room;
  }

  logout({ socket }: Request<any>) {
    // // const { socket } = req;
    // let status = 200;
    // // console.log('LOGOUT');
    // try {
    //   this.rooms.getRoom(this.getSocketRoom(socket))?.unsetPlayer(socket.id);
    //   if (this.rooms.getRoom(this.getSocketRoom(socket))?.isEmpty()) {
    //     this.rooms.unsetRoom(this.getSocketRoom(socket));
    //   } else {
    //     this.resGame(this.getSocketRoom(socket));
    //   }
    //   socket.leave(this.getSocketRoom(socket));
    //   // delete socket.redTetris;
    //   this.setSocket(socket);
    //   // this.resInfo();
    // } catch (err) {
    //   console.log(err);
    //   status = 500;
    // } finally {
    //   /* Socket is undefined when the user disconnect */
    //   if (socket) {
    //     this.emitToSocket(socket.id, ev.RESPONSE_LOGOUT, {
    //       status,
    //       payload: {},
    //     });
    //   }
    // }
  }
}
