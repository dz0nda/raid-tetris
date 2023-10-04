/* eslint-disable max-classes-per-file */

import ev from '@/shared/events';
// import Io, { Request } from '@/server/server/Io';

import { Request } from '@/server/server/SocketServer';
import Game from '@/server/app/Game';
import { Rooms } from '@/server/app/room/Rooms';
import { Chats } from '@/server/app/chat/Chats';
import { Socket } from '../socket/socket.entity';
// import { Socket } from 'socket.io-client';
import { SocketModule } from '../socket/socket.module';
import { Response } from '../utils/types';

export class AuthService {
  games: { [key: string]: Game };
  socket: SocketModule;
  rooms: Rooms;
  chats: Chats;

  constructor(socket: SocketModule) {
    this.games = {};
    this.rooms = new Rooms();
    this.chats = new Chats();
    this.socket = socket;
  }

  // resGame(room: string) {
  //   this.emitToRoom(room, ev.RESPONSE_UPDATE_GAME, {
  //     status: 200,
  //     payload: {
  //       game: this.rooms.getRoom(room),
  //     },
  //   });
  // }

  // resPlayer(socket: Socket, status: number, message: string) {
  //   this.emitToSocket(socket.id, ev.RESPONSE_UPDATE_PLAYER, {
  //     status,
  //     message,
  //     payload: {
  //       id: socket.id,
  //       player: this.rooms.getRoom(this.getSocketRoom(socket))?.getPlayer(socket.id),
  //     },
  //   });
  // }

  // resStart(room: string, status: number, message: string) {
  //   this.emitToRoom(room, ev.RESPONSE_START_GAME, {
  //     status,
  //     payload: {
  //       message,
  //       players: status === 200 ? this.rooms.getRoom(room)?.getPlayers() : {},
  //     },
  //   });
  // }

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
  login({ socket, data }: Request, res: Response) {
    const { name, room } = data;
    let status = 200;

    const socketWrapper = new Socket(socket, io);
    try {
      // this.getOrCreateGame(room, name).setPlayer(socket.id, name);
      this.rooms.getOrCreateRoom(room, name).setPlayer(socket.id, name);
      this.chats.getOrCreateChat(room).setMessage('server', `${name} joined the room`);

      socket.join(room);
      // socket.redTetris = { name, room };
      // this.setSocket(socket);

      socketWrapper.emitToRoom(room, ev.RESPONSE_UPDATE_GAME, {
        status: 200,
        payload: {
          game: this.rooms.getRoom(room),
        },
      });
      socketWrapper.emitToRoom(room, ev.RESPONSE_UPDATE_GAME_CHAT, {
        status: 200,
        payload: {
          room,
          chat: this.chats.getChat(room)?.getMessages(),
        },
      });
      // this.resInfo();
    } catch (err) {
      // logger.error(err);
      status = 500;
    } finally {
      // console.log(this.getGame(this.getSocketRoom(socket.id)));
      //   console.log(this.getSocket(socket.id).emit)
      socketWrapper.emitToSocket(socket.id, ev.RESPONSE_LOGIN, {
        status,
        payload: { name, room },
      });
    }
  }

  logout({ socket }: Request) {
    // const { socket } = req;
    let status = 200;

    // console.log('LOGOUT');

    try {
      this.rooms.getRoom(this.getSocketRoom(socket))?.unsetPlayer(socket.id);
      if (this.rooms.getRoom(this.getSocketRoom(socket))?.isEmpty()) {
        this.rooms.unsetRoom(this.getSocketRoom(socket));
      } else {
        this.resGame(this.getSocketRoom(socket));
      }

      socket.leave(this.getSocketRoom(socket));
      // delete socket.redTetris;
      this.setSocket(socket);

      // this.resInfo();
    } catch (err) {
      console.log(err);
      status = 500;
    } finally {
      /* Socket is undefined when the user disconnect */
      if (socket) {
        this.emitToSocket(socket.id, ev.RESPONSE_LOGOUT, {
          status,
          payload: {},
        });
      }
    }
  }
}
