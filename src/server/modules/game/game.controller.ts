import ev from '@/shared/events';
import { Request, Route } from '@/server/modules/utils/types';

import { moveSchema } from './game.schema';

import { SocketService } from '../socket/socket.service';
import { GameService } from './game.service';

export class GameController {
  service: GameService;
  socket: SocketService;
  routes: Route[];

  constructor(service: GameService, socket: SocketService) {
    this.service = service;
    this.socket = socket;
    this.routes = [
      {
        event: { req: ev.REQUEST_MOVE, res: ev.RESPONSE_MOVE },
        handler: this.move.bind(this),
        auth: true,
        schema: moveSchema,
      },
    ];
  }

  get getRoutes() {
    return this.routes;
  }

  public move(req: Request<{ keyCode: number }>) {
    this.service.move();
  }
}
