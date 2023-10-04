import ev from '@/shared/events';
import { Request, Route } from '@/server/modules/utils/types';

import { moveSchema, ownerSchema } from './rooms.schema';

import { SocketService } from '../socket/socket.service';
import { RoomsService } from './rooms.service';
import { Logger } from '../utils/utils';

export class RoomController {
  service: RoomsService;
  socket: SocketService;
  routes: Route[];

  constructor(service: RoomsService, socket: SocketService) {
    this.service = service;
    this.socket = socket;
    this.routes = [
      {
        event: { req: ev.REQUEST_START_GAME, res: ev.RESPONSE_START_GAME },
        handler: this.start.bind(this),
        auth: true,
        schema: null,
      },
      {
        event: { req: ev.REQUEST_UPDATE_GAME_OWNER, res: ev.RESPONSE_UPDATE_GAME_OWNER },
        handler: this.owner.bind(this),
        auth: true,
        schema: ownerSchema,
      },
      {
        event: { req: ev.REQUEST_MOVE, res: ev.RESPONSE_MOVE },
        handler: this.move.bind(this),
        auth: true,
        schema: moveSchema,
      },
    ];
  }

  public start(req: Request) {
    const socket = req.socket;

    try {
      Logger.info(`Socket ${socket.getSocketId} start game`);
    } catch (err) {
      Logger.err(err);

      this.socket.emitToSocket(socket.getSocketId, ev.RESPONSE_START_GAME, {
        status: 500,
        message: err,
        payload: {
          id: socket.getSocketId,
          player: {},
        },
      });
    }
  }

  public owner(req: Request) {
    const { socket } = req;
    const { owner } = req.data;

    try {
      Logger.info(`Socket ${socket.getSocketId} change owner to ${owner}`);
    } catch (err) {
      Logger.err(err);

      this.socket.emitToSocket(socket.getSocketId, ev.RESPONSE_UPDATE_GAME_OWNER, {
        status: 500,
        message: err,
        payload: {
          id: socket.getSocketId,
          player: {},
        },
      });
    }
  }

  public move(req: Request) {
    const { socket } = req;
    const { move } = req.data;

    try {
      Logger.info(`Socket ${socket.getSocketId} move ${move}`);
    } catch (err) {
      Logger.err(err);

      this.socket.emitToSocket(socket.getSocketId, ev.RESPONSE_MOVE, {
        status: 500,
        message: err,
        payload: {
          id: socket.getSocketId,
          player: {},
        },
      });
    }
  }
}
