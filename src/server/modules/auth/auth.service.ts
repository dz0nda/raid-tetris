import bcrypt from 'bcrypt';

import { Request } from '@/server/server/SocketServer';
import { RoomsService } from '../rooms/rooms.service';
import { ChatsService } from '../chats/chats.service';

export class AuthService {
  roomsService: RoomsService;
  chatsService: ChatsService;

  constructor(roomsService: RoomsService, chatsService: ChatsService) {
    this.roomsService = roomsService;
    this.chatsService = chatsService;
  }

  /*
   *  Login
   */
  loginUser(req: Request) {
    const { socket } = req;
    const { name, room } = req.data;
    // let status = 200;
  }

  /*
   *  Login
   */
  async login(id: string, name: string, roomName: string, roomPass?: string) {
    const room = this.roomsService.getOrCreateRoom(id, roomName, name, roomPass);
    if (roomPass) {
      const hashedPass = await bcrypt.hash(roomPass, 10);
      if (room.pass !== hashedPass) {
        throw new Error('Invalid password');
      }
    }
  }

  logout({ socket }: Request) {
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
