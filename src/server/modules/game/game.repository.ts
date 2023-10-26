import { DatabaseService } from '@/modules/database/database.service';
import { Game } from './game.entity';

const GAME_COLLECTION = 'games';

export class GameRepository {
  constructor(private dbService: DatabaseService) {}

  /**
   * Create or update a game by its ID.
   *
   * @param game - The game object.
   */
  async setGame(game: Game): Promise<void> {
    return this.dbService.set(GAME_COLLECTION, game.id, game);
  }

  /**
   * Fetches a game by its ID.
   *
   * @param gameId - The game ID.
   * @returns The game if found, otherwise null.
   */
  async getGame(gameId: string): Promise<Game | null> {
    return this.dbService.get<Game>(GAME_COLLECTION, gameId);
  }
}
