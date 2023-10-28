import 'regenerator-runtime/runtime';

import td from 'testdouble';

import ev from '../../../src/shared/events';
import actions from '../../../src/client/actions';
import store from '../../../src/client/store';
import { playerState } from '../../../src/client/reducers/player';

import { mockMiddleware, id, mockSocket, socketModule } from '../helpers/socketHelper';

socketModule.SOCKETS[id] = mockSocket;
socketModule.toggleInitStatus(id);

describe('# Socket Tests - Player Events', () => {
  describe('## Client Events', () => {
    it('should execute req_UPDATE_PLAYER', () => {
      const payload = {
        keyCode: 'keyCode',
      };
      const payloadExpected = {
        room: '',
        name: null,
        keyCode: 'keyCode',
      };

      mockMiddleware(store)(() => true)(actions.reqMove(payload));
      expect(mockSocket.emit).toHaveBeenCalledWith(ev.req_UPDATE_PLAYER, payloadExpected);
    });
  });

  describe('## Server Events', () => {
    beforeEach(() => {
      td.replace(store, 'dispatch', jest.fn());
    });

    it('should execute res_UPDATE_PLAYER', () => {
      const data = {
        status: 200,
        payload: {
          player: playerState,
        },
      };

      mockMiddleware(store)(() => true)({
        type: `${id}_server`,
        payload: {
          type: ev.res_UPDATE_PLAYER,
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
