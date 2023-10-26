import ev from '@/shared/events';
import { Request, Route } from '@/server/modules/utils/types';
import { Logger } from '../utils/utils';

import { joinRoomSchema, ownerSchema } from './room.schema';

import { SocketService } from '../socket/socket.service';
import { RoomService } from './room.service';
import { AuthService } from '../auth/auth.service';
import { JoinRoomDto } from './room.dto';

export class RoomController {
  routes: Route[];

  constructor(
    private readonly roomService: RoomService,
    private readonly socketService: SocketService,
    private readonly authService: AuthService,
  ) {
    this.routes = [
      {
        event: { req: ev.REQUEST_JOIN_ROOM, res: ev.RESPONSE_JOIN_ROOM },
        handler: this.joinRoom.bind(this),
        auth: this.authService.validateLoggedUser.bind(this.authService),
        schema: joinRoomSchema,
      },
      {
        event: { req: ev.REQUEST_START_GAME, res: ev.RESPONSE_START_GAME },
        handler: this.startGame.bind(this),
        auth: this.authService.validateUserInRoom.bind(this.authService),
        schema: null,
      },
      {
        event: { req: ev.REQUEST_UPDATE_GAME_OWNER, res: ev.RESPONSE_UPDATE_GAME_OWNER },
        handler: this.changeOwner.bind(this),
        auth: this.authService.validateUserInRoom.bind(this.authService),
        schema: ownerSchema,
      },
    ];
  }

  get getRoutes() {
    return this.routes;
  }

  public async joinRoom(req: Request<JoinRoomDto>) {
    try {
      Logger.info(`Socket ${req.socket.room} joined room in`);

      // console.log(req);
      console.log('req.user:', req.user);
      const room = await this.roomService.joinRoom(req.user.id, req.data.room, req.data.password);

      req.socket.raw.join(req.data.room);

      Logger.info('firing event');
      this.socketService.emitToSocket(req.socket.id, ev.RESPONSE_JOIN_ROOM, {
        status: 200,
        payload: {
          username: req.user.username,
          room: room,
        },
      });
      // req.socket.emitToRoom(req.data.room, ev.RESPONSE_UPDATE_GAME, {
      //   status: 200,
      //   payload: {
      //     game: this.roomsService.getRoom(req.data.room),
      //   },
      // });
      // req.socket.emitToRoom(req.data.room, ev.RESPONSE_UPDATE_GAME_CHAT, {
      //   status: 200,
      //   payload: {
      //     room: req.data.room,
      //     // chat: this.chatService.getChat(req.data.room)?.getMessages(),
      //   },
      // });
    } catch (err) {
      Logger.error(err);
    }
  }

  public async startGame(req: Request<any>) {
    try {
      Logger.info(`Socket ${req.socket.id} started a game`);

      this.roomService.startGame('prout', 'prout', 'prout');

      this.socketService.emitToRoom(req.socket.room, ev.RESPONSE_START_GAME, {
        status: 200,
        payload: {
          // games: this.service.getRoomGames(req.socket.getRoom)?.get(),
        },
      });
      // this.service.startGame(req.data.room, req.socket.getSocketId);
      // this.service.getRoom(req.socket.getRoom)?.initGameStart(req.socket.getSocketId);
      // req.socket.emitToRoom(req.socket.getRoom, ev.RESPONSE_UPDATE_GAME, {
      //   status: 200,
      //   payload: {
      //     players: this.service.getRoom(req.socket.getRoom)?.getPlayers(),
      //   },
      // });
    } catch (err) {
      Logger.error(err);
    }
  }

  public async changeOwner(req: Request<{ owner: string }>) {
    // const socket = req.socket;
    // this.service.getRoom(socket.getRoom)?.setOwner(req.data.owner);
    // socket.emitToRoom(socket.getRoom, ev.RESPONSE_UPDATE_GAME_OWNER, {
    //   status: 200,
    //   payload: {
    //     game: this.service.getRoom(socket.getRoom),
    //   },
    // });
  }
}
