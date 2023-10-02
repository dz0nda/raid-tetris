/* eslint-disable max-classes-per-file */

import ev from '@/shared/events';
// import Io, { Request } from '@/server/server/Io';

import { Request, SocketServer } from '@/server/server/SocketServer';
import Game from '@/server/app/Game';
import { Rooms } from '@/server/app/room/Rooms';
import { Chats } from '@/server/app/chat/Chats';
import { Socket } from 'socket.io';
// import { Socket } from 'socket.io-client';

export class AuthService {
  games: { [key: string]: Game };
  socket: SocketServer;
  rooms: Rooms;
  chats: Chats;

  constructor(socket: SocketServer) {
    this.games = {};
    this.rooms = new Rooms();
    this.chats = new Chats();
    this.socket = socket;
  }

  resGame(room: string) {
    this.emitToRoom(room, ev.RESPONSE_UPDATE_GAME, {
      status: 200,
      payload: {
        game: this.rooms.getRoom(room),
      },
    });
  }

  resPlayer(socket: Socket, status: number, message: string) {
    this.emitToSocket(socket.id, ev.RESPONSE_UPDATE_PLAYER, {
      status,
      message,
      payload: {
        id: socket.id,
        player: this.rooms.getRoom(this.getSocketRoom(socket))?.getPlayer(socket.id),
      },
    });
  }

  resStart(room: string, status: number, message: string) {
    this.emitToRoom(room, ev.RESPONSE_START_GAME, {
      status,
      payload: {
        message,
        players: status === 200 ? this.rooms.getRoom(room)?.getPlayers() : {},
      },
    });
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
  login(req: Request) {
    const { socket } = req;
    const { name, room } = req.data;
    let status = 200;

    try {
      // this.getOrCreateGame(room, name).setPlayer(socket.id, name);
      this.rooms.getOrCreateRoom(room, name).setPlayer(socket.id, name);
      this.chats.getOrCreateChat(room).setMessage('server', `${name} joined the room`);

      socket.join(room);
      // socket.redTetris = { name, room };
      // this.setSocket(socket);

      this.resGame(room);
      this.emitToRoom(room, ev.RESPONSE_UPDATE_GAME_CHAT, {
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
      this.emitToSocket(socket.id, ev.RESPONSE_LOGIN, {
        status,
        payload: { name, room },
      });
    }
  }

  logout(req: Request) {
    const { socket } = req;
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

  start(req: Request) {
    const { socket } = req;
    // const status = 200;

    console.log('START');
    console.log(this.getSocketRoom(socket));

    try {
      this.rooms.getRoom(this.getSocketRoom(socket))?.initGameStart(socket.id);
      this.rooms.getRoom(this.getSocketRoom(socket));
      this.rooms.getRoom(this.getSocketRoom(socket))?.setGameStart();

      const countdown = (room: string, count: number, self: any) => {
        if (count > 0) {
          setTimeout(countdown, 1000, room, count - 1, self);

          // self.resStart(room, 100, `Game will start in ${count}s...`);
        } else {
          self.emitToRoom(room, ev.RESPONSE_UPDATE_GAME_SETTINGS, {
            status: 200,
            payload: {
              settings: this.rooms.getRoom(room)?.settings,
            },
          });
          self.resStart(room, 200, 'Game started !');
          // self.chat({ ...req, data: { text: 'A new game started.' } });
          this.chats.getChat(room)?.setMessage('server', `${this.rooms.getRoom(room)?.getOwner()} started the game`);
          // self.resInfo();
        }
      };

      setTimeout(countdown, 100, this.getSocketRoom(socket), 3, this);
    } catch (err: any) {
      // logger.error(err);
      this.resPlayer(socket, 500, err.message);
    }
  }

  owner(req: Request) {
    const { socket } = req;
    const { newOwner } = req.data;

    try {
      this.rooms.getRoom(this.getSocketRoom(socket))?.setNewOwner(socket.id, newOwner);

      this.resGame(this.getSocketRoom(socket));
    } catch (err: any) {
      // logger.error('[reqOwner] ');

      this.resPlayer(socket, 500, err.message);
    }
  }

  chat(req: Request) {
    const { socket } = req;
    const { text } = req.data;

    try {
      this.chats
        .getChat(this.getSocketRoom(socket))
        ?.setMessage(this.rooms.getRoom(this.getSocketRoom(socket))?.getPlayer(socket.id).getName() || '', text);

      this.emitToRoom(this.getSocketRoom(socket), ev.RESPONSE_UPDATE_GAME_CHAT, {
        status: 200,
        payload: {
          chat: this.chats.getChat(this.getSocketRoom(socket))?.getMessages(),
        },
      });
    } catch (err: any) {
      // logger.error(err);

      this.resPlayer(socket, 500, err.message);
    }
  }

  move(req: Request) {
    const { socket } = req;
    const { keyCode } = req.data;
    let status = 200;

    try {
      const collided = this.rooms.getRoom(this.getSocketRoom(socket))?.setMove(socket.id, keyCode);

      if (collided) {
        this.emitToRoom(this.getSocketRoom(socket), ev.RESPONSE_UPDATE_GAME_PLAYERS, {
          status: 200,
          payload: {
            players: this.rooms.getRoom(this.getSocketRoom(socket))?.getPlayers(),
          },
        });
      }

      if (!this.rooms.getRoom(this.getSocketRoom(socket))?.getStarted()) {
        this.resGame(this.getSocketRoom(socket));
        // this.resInfo();
      }
    } catch (err) {
      // logger.error(err);
      status = 500;
    } finally {
      this.resPlayer(socket, status, '');
    }
  }
}
