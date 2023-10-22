import ev from '@/shared/events';
import { Request, Route } from '@/server/modules/utils/types';

import { joinRoomSchema } from '../../redtetris.validation';

import { AuthService } from './auth.service';
import { JoinRoomDto, LoginDto } from './auth.dto';
import { Logger } from '../utils/utils';
import { loginSchema } from './auth.schema';

export class AuthController {
  service: AuthService;
  routes: Route[];

  constructor(service: AuthService) {
    this.service = service;
    this.routes = [
      {
        event: { req: ev.REQUEST_LOGIN, res: ev.RESPONSE_LOGIN },
        handler: this.login.bind(this),
        auth: false,
        schema: loginSchema,
      },
      {
        event: { req: ev.REQUEST_JOIN_ROOM, res: ev.RESPONSE_JOIN_ROOM },
        handler: this.joinRoom.bind(this),
        auth: false,
        schema: joinRoomSchema,
      },
      {
        event: { req: ev.REQUEST_LOGOUT, res: ev.RESPONSE_LOGOUT },
        handler: this.logout.bind(this),
        auth: true,
        schema: null,
      },
    ];
  }

  get getRoutes() {
    return this.routes;
  }

  public async login(req: Request<LoginDto>) {
    try {
      Logger.info(`Socket ${req.socket.getSocketId} try to log in`);

      const user = await this.service.login(req.data, req.socket.getSocketId);

      // req.socket.emitToSocket(req.socket.getSocketId, ev.RESPONSE_LOGIN, {
      //   status: 200,
      //   payload: { user },
      // });
    } catch (err) {
      Logger.error(err);
    }
  }

  public async joinRoom(req: Request<JoinRoomDto>) {
    try {
      Logger.info(`Socket ${req.socket.getSocketId} joined room in`);

      const room = await this.service.joinRoom(req.data);

      req.socket.value().join(req.data.room);

      // req.socket.emitToSocket(req.socket.getSocketId, ev.RESPONSE_JOIN_ROOM, {
      //   status: 200,
      //   payload: {
      //     room: room,
      //   },
      // });
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

  public logout(req: Request<any>) {
    const socket = req.socket;
    // const messages = this.service.addMessage(socket.getRoom, socket.getUsername, req.data.text);
    // this.socket.emitToRoom(socket.getRoom, ev.RESPONSE_UPDATE_GAME_CHAT, {
    //   status: 200,
    //   payload: {
    //     chat: messages,
    //   },
    // });
  }
}
