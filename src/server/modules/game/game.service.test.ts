import { DatabaseService } from '@/modules/database/database.service';
import { GameService } from './game.service';
import Game from './game.entity';

describe('GameService', () => {
  let service: GameService;
  let mockDbService: jest.Mocked<DatabaseService>;

  beforeEach(() => {
    mockDbService = {
      set: jest.fn(),
      get: jest.fn(),
      // ... other mocked methods ...
    } as any;
    service = new GameService(mockDbService);
  });

  it('should initialize a new game', () => {
    const game = service.initNewGame();
    expect(game).toBeInstanceOf(Game);
  });

  it('should save game state', async () => {
    const mockGame = new Game();
    await service.saveGameState('testId', mockGame);
    expect(mockDbService.set).toHaveBeenCalledWith('game', 'testId', mockGame);
  });

  // ... other tests ...
});
