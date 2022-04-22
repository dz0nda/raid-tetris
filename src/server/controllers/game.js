import logger from '../utils/logger';
import {
  resUpdateAppInfos,
  resUpdateGame,
  resUpdateGameSettings,
  resUpdateGameChat,
  resUpdateGameStartRoom,
  resUpdatePlayer,
} from '../helpers/emitHelper';

import RedTetris from '../models';

const countdown = (req, res, count) => {
  const { Game } = req;

  if (count > 0) {
    setTimeout(countdown, 1000, req, res, count - 1);

    resUpdateGameStartRoom(res.io, Game, 100, `Game will start in ${count}s...`);
  } else {
    resUpdateGameSettings(res.io, Game);
    resUpdateGameStartRoom(res.io, Game, 200, '');
    resUpdateAppInfos(res.io, RedTetris);
  }
};

const resStart = async (req, res) => {
  const { id } = req.socket;

  try {
    const Game = RedTetris.getCreatedGame(id);
    if (!Game) throw new Error('Game not found');

    Game.initGameStart(id);
    resUpdateGame(res.io, Game);
    Game.setGameStart();

    setTimeout(countdown, 100, { ...req, Game }, res, 3);
  } catch (err) {
    logger.error('[reqStart] ');

    resUpdatePlayer(req.socket, 500, err.message, null);
  }
};

const resOwner = async (req, res) => {
  const { id } = req.socket;
  const { newOwner } = req.data;

  try {
    const Game = RedTetris.getCreatedGame(req.socket.id);
    if (!Game) throw new Error("Can't get the game");

    Game.setNewOwner(id, newOwner);

    resUpdateGame(res.io, Game);
  } catch (err) {
    logger.error('[reqOwner] ');

    resUpdatePlayer(req.socket, 500, err.message, null);
  }
};

const resChat = async (req, res) => {
  const { id } = req.socket;
  const { text } = req.data;

  try {
    const Game = RedTetris.getCreatedGame(req.socket.id);
    if (!Game) throw new Error("Can't get the game");

    Game.setMessage(Game.getPlayer(id).getName(), text);

    resUpdateGameChat(res.io, Game);
  } catch (err) {
    logger.error('[reqChat] ');

    resUpdatePlayer(req.socket, 500, err.message, null);
  }
};

export default {
  resStart,
  resOwner,
  resChat,
};
