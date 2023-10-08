import ev from '@/shared/events';
import { Request, Route } from '@/server/modules/utils/types';
import { loginSchema } from '@/server/redtetris.validation';

import { RoomsService } from '../rooms/rooms.service';
import { ChatsService } from '../chats/chats.service';
import { AuthService } from './auth.service';
import { LoginDto } from './auth.dto';
import { Logger } from '../utils/utils';

export class AuthController {
  service: AuthService;
  roomsService: RoomsService;
  chatService: ChatsService;
  routes: Route[];

  constructor(service: AuthService, roomsService: RoomsService, chatsService: ChatsService) {
    this.service = service;
    this.roomsService = roomsService;
    this.chatService = chatsService;
    this.routes = [
      // {
      //   event: { req: ev.REQUEST_LOGIN_USER, res: ev.RESPONSE_LOGIN_USER },
      //   handler: service.loginUser.bind(this),
      //   auth: false,
      //   schema: null,
      // },
      {
        event: { req: ev.REQUEST_LOGIN, res: ev.RESPONSE_LOGIN },
        handler: this.login.bind(this),
        auth: false,
        schema: loginSchema,
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

  public login(req: Request<LoginDto>) {
    Logger.info(`Socket ${req.socket.getSocketId} logged in`);

    this.service.login(req.data.id, req.data.name, req.data.room, req.data.pass);

    req.socket.value().join(req.data.room);

    req.socket.emitToSocket(req.socket.getSocketId, ev.RESPONSE_LOGIN, {
      status: 200,
      payload: {
        name: req.data.name,
        room: req.data.room,
      },
    });
    req.socket.emitToRoom(req.data.room, ev.RESPONSE_UPDATE_GAME, {
      status: 200,
      payload: {
        game: this.roomsService.getRoom(req.data.room),
      },
    });
    req.socket.emitToRoom(req.data.room, ev.RESPONSE_UPDATE_GAME_CHAT, {
      status: 200,
      payload: {
        room: req.data.room,
        chat: this.chatService.getChat(req.data.room)?.getMessages(),
      },
    });
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
