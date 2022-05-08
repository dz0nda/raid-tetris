import ev from '../../../src/shared/events';
import reducer, { appState } from '../../../src/client/reducers/app';

describe('# Redux Tests - App Reducer', () => {
  const initialState = appState;

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  it('should handle UPDATE_CONNECTION', () => {
    const action = {
      type: ev.UPDATE_CONNECTION,
      payload: {
        id: '1',
        connected: true,
        isLoading: false,
        snackbar: {
          message: '',
          variant: '',
        },
      },
    };
    const expectedState = {
      ...initialState,
      ...action.payload,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_LOG', () => {
    const action = {
      type: ev.UPDATE_LOG,
      payload: {
        isLoading: false,
        snackbar: {
          message: '',
          variant: '',
        },
      },
    };
    const expectedState = {
      ...initialState,
      ...action.payload,
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle UPDATE_INFOS', () => {
    const action = {
      type: ev.UPDATE_INFOS,
      payload: {
        nbPlayers: 1,
        nbGames: 1,
        games: { 1: true },
      },
    };
    const expectedState = {
      ...initialState,
      infos: {
        ...action.payload,
      },
    };

    expect(reducer(initialState, action)).toEqual(expectedState);
  });
});
