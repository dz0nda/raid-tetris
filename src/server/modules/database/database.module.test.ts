import Redis from 'ioredis';
import { DatabaseModule } from './database.module';

// Mock the 'ioredis' module
jest.mock('ioredis');

describe('DatabaseModule', () => {
  let databaseModule: DatabaseModule;
  let mockRedis: jest.Mocked<Redis>;

  beforeEach(() => {
    // Reset the singleton instance to ensure a fresh start for each test
    (DatabaseModule as any).instance = undefined;

    // Create a mocked Redis instance
    mockRedis = new Redis() as jest.Mocked<Redis>;

    // Initialize the DatabaseModule with the mocked Redis instance
    databaseModule = DatabaseModule.getInstance(mockRedis);
  });

  describe('getInstance', () => {
    it('should provide a singleton instance', () => {
      const anotherInstance = DatabaseModule.getInstance();
      expect(databaseModule).toBe(anotherInstance);
      expect(anotherInstance.redis).toBe(mockRedis);
    });

    it('should provide a Redis instance', () => {
      expect(databaseModule.redis).toBeInstanceOf(Redis);
    });

    it('should throw an error if Redis instance is not provided during the first instantiation', () => {
      // Reset the singleton instance
      (DatabaseModule as any).instance = undefined;

      // Try to get an instance without providing a Redis instance
      expect(() => DatabaseModule.getInstance()).toThrowError('DatabaseModule requires a Redis instance.');
    });
  });
});
