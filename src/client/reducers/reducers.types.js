import PropTypes from 'prop-types';

/* Common  */

export const stagePropTypes = PropTypes.arrayOf(
  PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))),
);

export const piecePropTypes = PropTypes.shape({
  form: PropTypes.shape({
    color: PropTypes.string.isRequired,
    shape: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number]))),
  }),
});

export const messagePropTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
});

/* Player */

export const playerStateProp = {
  name: PropTypes.string,
  score: PropTypes.number,
  lines: PropTypes.number,
  mallus: PropTypes.number,
  rank: PropTypes.number,
  stage: stagePropTypes,
  piece: piecePropTypes,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }),
  nbPiece: PropTypes.number,
  loose: PropTypes.bool,
};

export const playerStatePropTypes = PropTypes.shape(playerStateProp);

/* Game */

export const settingsProp = {
  owner: PropTypes.string,
  started: PropTypes.bool,
  status: PropTypes.string,
  dropTime: PropTypes.number,
  nbLoosers: PropTypes.number,
  nbPlayers: PropTypes.number,
  pieces: PropTypes.arrayOf(piecePropTypes),
};

export const settingsPropTypes = PropTypes.shape(settingsProp);

export const roomStateProp = {
  room: PropTypes.string,
  settings: PropTypes.shape(settingsProp),
};

export const roomStatePropTypes = PropTypes.shape(roomStateProp);

export const chatStatePropTypes = PropTypes.arrayOf(messagePropTypes);

export const playersStatePropTypes = PropTypes.objectOf(playerStatePropTypes);

export const gameStateProp = {
  room: PropTypes.string,
  settings: settingsPropTypes,
  players: playersStatePropTypes,
  chat: chatStatePropTypes,
};

export const gameStatePropTypes = PropTypes.shape(gameStateProp);

/* App */

export const appStateProp = {
  id: PropTypes.string.isRequired,
  connected: PropTypes.bool.isRequired,
  logged: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  nbPlayers: PropTypes.number.isRequired,
  nbGames: PropTypes.number.isRequired,
  games: PropTypes.arrayOf(gameStatePropTypes),
};

export const appStatePropTypes = PropTypes.shape(appStateProp);
