import 'regenerator-runtime/runtime';

import td from 'testdouble';

import ev from '../../../src/shared/events';

import actions from '../../../src/client/actions';
import store from '../../../src/client/store';

import { mockMiddleware, id, mockSocket } from '../helpers/socketHelper';

describe('# Socket Tests - App Events', () => {
  describe('## Client Events', () => {
    it('should emit reqLogin', () => {
      const payload = {
        name: 'name',
        room: 'room',
      };

      mockMiddleware(store)(() => true)(actions.reqLogin(payload));
      expect(mockSocket.emit).toHaveBeenCalled();
    });
    it('should emit reqLogin', () => {
      const payload = {
        name: 'name',
        room: 'room',
      };

      mockMiddleware(store)(() => true)(actions.reqLogin(payload));
      expect(mockSocket.emit).toHaveBeenCalled();
    });

    it('should emit reqLogout', () => {
      mockMiddleware(store)(() => true)(actions.reqLogout({}));
      expect(mockSocket.emit).toHaveBeenCalled();
    });
  });

  describe('## Server Events', () => {
    beforeEach(() => {
      td.replace(store, 'dispatch', jest.fn());
    });

    it('should handle res_UPDATE_APP_INFOS', () => {
      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.res_UPDATE_APP_INFOS,
          data: {
            status: 200,
            payload: {
              nbPlayers: 1,
              nbGames: 1,
              games: { id: true },
            },
          },
        },
      });
    });

    it('should handle res_LOGIN', () => {
      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.res_LOGIN,
          data: {
            status: 200,
            payload: {
              player: { name: 'name' },
              room: { room: 'room' },
            },
          },
        },
      });

      expect(store.dispatch).toHaveBeenCalled();

      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.res_LOGIN,
          data: {
            status: 500,
            payload: {},
          },
        },
      });

      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should handle res_LOGOUT', () => {
      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.res_LOGOUT,
          data: {
            status: 200,
            payload: {},
          },
        },
      });

      expect(store.dispatch).toHaveBeenCalled();

      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.res_LOGOUT,
          data: {
            status: 500,
            payload: {
              player: { name: 'name' },
              room: { room: 'room' },
            },
          },
        },
      });

      expect(store.dispatch).toHaveBeenCalled();
    });
  });
});
