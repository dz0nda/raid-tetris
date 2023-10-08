import ev from '@/shared/events';
import { Route } from '@/server/modules/utils/types';
import { Request } from '@/server/modules/utils/types';
import { SocketService } from '@/server/modules/socket/socket.service';

import { ChatsService } from './chats.service';
import { sendChatMessageSchema } from './chats.schema';

export class ChatsController {
  service: ChatsService;
  socket: SocketService;
  routes: Route[];

  constructor(service: ChatsService, socket: SocketService) {
    this.service = service;
    this.socket = socket;
    this.routes = [
      {
        event: { req: ev.REQUEST_UPDATE_GAME_CHAT, res: ev.RESPONSE_UPDATE_GAME_CHAT },
        handler: this.sendChatMessage.bind(this),
        schema: sendChatMessageSchema,
        auth: true,
      },
    ];
  }

  get getRoutes() {
    return this.routes;
  }

  public sendChatMessage(req: Request<{ text: string }>) {
    const socket = req.socket;

    const messages = this.service.addMessage(socket.getRoom, socket.getUsername, req.data.text);

    this.socket.emitToRoom(socket.getRoom, ev.RESPONSE_UPDATE_GAME_CHAT, {
      status: 200,
      payload: {
        chat: messages,
      },
    });
  }
}
