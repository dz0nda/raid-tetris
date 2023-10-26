import ev from '@/shared/events';

import { SocketService } from '../socket/socket.service';
import { GameController } from './game.controller';
import { GameService } from './game.service';

// Mocking GameService and SocketService
jest.mock('./game.service');
jest.mock('../socket/socket.service');

describe('GameController', () => {
  let gameController: GameController;
  let mockGameService: jest.Mocked<GameService>;
  let mockSocketService: jest.Mocked<SocketService>;

  beforeEach(() => {
    mockGameService = new GameService() as jest.Mocked<GameService>;
    mockSocketService = new SocketService() as jest.Mocked<SocketService>;
    gameController = new GameController(mockGameService, mockSocketService);
  });

  describe('getRoutes', () => {
    it('should return the routes', () => {
      const routes = gameController.getRoutes;
      expect(routes).toHaveLength(1);
      expect(routes[0].event.req).toBe(ev.REQUEST_MOVE);
    });
  });

  describe('move', () => {
    it('should call the move method of the GameService', () => {
      const mockReq = { data: { keyCode: 37 } }; // Example request with keyCode for left arrow
      gameController.move(mockReq as any);
      expect(mockGameService.move).toHaveBeenCalled();
    });
  });
});
