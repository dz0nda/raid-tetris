import { GameRepository } from './game.repository';
import { Game } from './game.entity';

export class GameService {
  constructor(private readonly gameRepository: GameRepository) {}

  /**
   * Initializes a new game.
   *
   * @returns The initialized game instance.
   */
  initNewGame(): Game {
    return new Game('id');
  }

  async move() {
    console.log('move');
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
