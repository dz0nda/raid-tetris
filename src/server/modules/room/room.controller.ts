import ev from '@/shared/events';
import { Request, Route } from '@/server/modules/utils/types';
import { Logger } from '../utils/utils';

import { moveSchema, ownerSchema } from './room.schema';

import { SocketService } from '../socket/socket.service';
import { RoomService } from './room.service';

export class RoomController {
  service: RoomService;
  socket: SocketService;
  routes: Route[];

  constructor(service: RoomService, socket: SocketService) {
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

  get getRoutes() {
    return this.routes;
  }

  public start(req: Request<any>) {
    try {
      Logger.info(`Socket ${req.socket.getSocketId} started a game`);

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
    // const socket = req.socket;
    // Logger.info(`Socket ${socket.getSocketId} started a game`);
    // this.service.getRoom(socket.getRoom)?.initGameStart(socket.getSocketId);
    // socket.emitToRoom(socket.getRoom, ev.RESPONSE_UPDATE_GAME, {
    //   status: 200,
    //   payload: {
    //     players: this.service.getRoom(socket.getRoom)?.getPlayers(),
    //   },
    // });
  }

  public owner(req: Request<{ owner: string }>) {
    // const socket = req.socket;
    // this.service.getRoom(socket.getRoom)?.setOwner(req.data.owner);
    // socket.emitToRoom(socket.getRoom, ev.RESPONSE_UPDATE_GAME_OWNER, {
    //   status: 200,
    //   payload: {
    //     game: this.service.getRoom(socket.getRoom),
    //   },
    // });
  }

  public move(req: Request<{ keyCode: number }>) {
    // const socket = req.socket;
    // const room = this.service.getRoom(socket.getRoom);
    // if (!room) {
    //   throw new Error('Room not found');
    // }
    // const collided = room.setMove(req.socket.getSocketId, req.data.keyCode);
    // if (collided) {
    //   socket.emitToRoom(socket.getRoom, ev.RESPONSE_UPDATE_GAME, {
    //     status: 200,
    //     payload: {
    //       players: this.service.getRoom(socket.getRoom)?.getPlayers(),
    //     },
    //   });
    // }
    // if (room.getStarted() === false) {
    //   socket.emitToRoom(socket.getRoom, ev.RESPONSE_UPDATE_GAME, {
    //     status: 200,
    //     payload: {
    //       game: this.service.getRoom(socket.getRoom),
    //     },
    //   });
    // }
  }
}
