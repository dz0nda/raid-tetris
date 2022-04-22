/* eslint-disable no-unused-vars */
import RedTetris from '../models';
import logger from '../utils/logger';
import {
  resUpdateAppInfos,
  resUpdateGame,
  resUpdateGameStartRoom,
  resUpdateGamePlayers,
  resUpdatePlayer,
  resUpdateGameStartPlayer,
} from '../helpers/emitHelper';
import { allowedKeys } from '../helpers/gameHelper';

const resMove = (req, res) => {
  const { id } = req.socket;
  const { keyCode } = req.data;

  try {
    const Game = RedTetris.getCreatedGame(id);
    if (!Game) throw new Error('Game not found');

    const Player = Game.getPlayer(id);
    if (!Player) throw new Error('Player not found');

    if (!allowedKeys.includes(keyCode)) throw new Error(`Key not allowed: ${keyCode}`);

    Player.setMove(keyCode);
    // Game.setMove(id, keyCode);

    /* Player collided */
    if (Player.getCollided()) {
      Game.updateCollision(req.socket.id);
      resUpdateGamePlayers(res.io, Game, req.socket.id);
      Player.setFlushUpdate();
    }

    /* Player win or loose */
    if (Player.getFinish()) {
      Game.updateLoose(req.socket.id);
    }

    /* Game finished */
    if (!Game.getStarted()) {
      resUpdateGame(res.io, Game);
      resUpdateAppInfos(res.io, RedTetris);
    }

    resUpdatePlayer(req.socket, 200, '', Player);
  } catch (err) {
    logger.error('[resMove] ');
  }
};

export default {
  resMove,
};
