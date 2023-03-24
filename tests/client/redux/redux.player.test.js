import ev from '../../../src/shared/events';
import reducer, { playerState } from '../../../src/client/store/reducers/player';

describe('# Redux Tests - Player Reducer', () => {
  const initialState = playerState;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_PLAYER', () => {
    const action = {
      type: ev.UPDATE_PLAYER,
      payload: {
        player: {
          ...initialState,
          score: 42,
        },
      },
    };
    const expectedState = {
      ...action.payload.player,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
