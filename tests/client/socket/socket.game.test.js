import td from 'testdouble';

import ev from '../../../src/shared/events';
import { actions, gameState } from '../../../src/client/store/reducers/game';
import store from '../../../src/client/store';

import { mockMiddleware, id, mockSocket } from '../helpers/socketHelper';

describe('# Socket Tests - Game Events', () => {
  describe('## Client Events', () => {
    it('should execute REQUEST_UPDATE_GAME_OWNER', () => {
      const payload = {
        newOwner: 'newOwner',
      };
      const payloadExpected = {
        name: '',
        room: '',
        newOwner: 'newOwner',
      };

      mockMiddleware(store)(() => true)(actions.reqOwner(payload));
      expect(mockSocket.emit).toHaveBeenCalledWith(ev.REQUEST_UPDATE_GAME_OWNER, payloadExpected);
    });

    it('should execute REQUEST_UPDATE_GAME_CHAT', () => {
      const payload = {
        message: 'text',
      };
      const payloadExpected = {
        name: '',
        room: '',
        text: 'text',
      };

      mockMiddleware(store)(() => true)(actions.reqChat(payload));
      expect(mockSocket.emit).toHaveBeenCalledWith(ev.REQUEST_UPDATE_GAME_CHAT, payloadExpected);
    });

    it('should execute REQUEST_START_GAME', () => {
      const payloadExpected = {
        name: '',
        room: '',
      };

      mockMiddleware(store)(() => true)(actions.reqStartGame({}));
      expect(mockSocket.emit).toHaveBeenCalledWith(ev.REQUEST_START_GAME, payloadExpected);
    });
  });

  describe('## Server Events', () => {
    beforeEach(() => {
      td.replace(store, 'dispatch', jest.fn());
    });

    it('should execute RESPONSE_UPDATE_GAME', () => {
      const data = {
        status: 200,
        payload: {
          game: gameState,
        },
      };

      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.RESPONSE_UPDATE_GAME,
          data,
        },
      });

      expect(store.dispatch).toHaveBeenCalled();
    });

    it('should execute RESPONSE_UPDATE_GAME_CHAT', () => {
      const data = {
        status: 200,
        payload: {
          chat: [{ id: true }],
        },
      };

      mockMiddleware(store)(() => true)({
        type: `${id}_*`,
        payload: {
          type: ev.RESPONSE_UPDATE_GAME_CHAT,
          data,
        },
      });

      expect(store.dispatch).toHaveBeenCalledWith({
        type: ev.UPDATE_GAME_CHAT,
        payload: {
          chat: data.payload.chat,
        },
      });
    });
  });
});
