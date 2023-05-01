import td from 'testdouble';

import ev from '../../../src/shared/events';
import { actions, playerState } from '../../../src/client/store/reducers/player';
import store from '../../../src/client/store';

import { mockMiddleware, id, mockSocket } from '../helpers/socketHelper';

describe('# Socket Tests - Player Events', () => {
  describe('## Client Events', () => {
    it('should execute REQUEST_UPDATE_PLAYER', () => {
      const payload = {
        keyCode: 'keyCode',
      };
      const payloadExpected = {
        room: '',
        name: null,
        keyCode: 'keyCode',
      };

      mockMiddleware(store)(() => true)(actions.reqMove(payload));
      expect(mockSocket.emit).toHaveBeenCalledWith(ev.REQUEST_UPDATE_PLAYER, payloadExpected);
    });
  });

  describe('## Server Events', () => {
    beforeEach(() => {
      td.replace(store, 'dispatch', jest.fn());
    });

    it('should execute RESPONSE_UPDATE_PLAYER', () => {
      const data = {
        status: 200,
        payload: {
          player: playerState,
        },
      };

      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.RESPONSE_UPDATE_PLAYER,
          data,
        },
      });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: ev.UPDATE_PLAYER,
        payload: {
          player: data.payload.player,
        },
      });
    });
  });
});
