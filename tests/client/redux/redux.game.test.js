import ev from '../../../src/shared/events';
import reducer, { gameState } from '../../../src/client/store/reducers/game';
// import { TETROMINOS } from '../../src/client/components/Game/tetrominos';

describe('# Redux Tests - Game Reducer', () => {
  const initialState = gameState;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_GAME', () => {
    const action = {
      type: ev.UPDATE_GAME,
      payload: {
        ...initialState,
        room: 'room',
      },
    };
    const expectedState = {
      ...action.payload.game,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_GAME_SETTINGS', () => {
    const action = {
      type: ev.UPDATE_GAME_SETTINGS,
      payload: {
        settings: {
          ...initialState.settings,
          owner: 'owner',
        },
      },
    };
    const expectedState = {
      ...initialState,
      settings: action.payload.settings,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_GAME_PLAYERS', () => {
    const action = {
      type: ev.UPDATE_GAME_PLAYERS,
      payload: {
        id: 'id',
        player: {},
      },
    };
    const expectedState = {
      ...initialState,
      players: {
        id: {},
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_GAME_CHAT', () => {
    const action = {
      type: ev.UPDATE_GAME_CHAT,
      payload: {
        chat: {
          id: true,
        },
      },
    };
    const expectedState = {
      ...initialState,
      chat: action.payload.chat,
    };
    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
