import Redis from 'ioredis';
import { DatabaseService } from './database.service';

jest.mock('ioredis');

let dbService: DatabaseService;
let mockRedis: jest.Mocked<Redis>;

describe('DatabaseService', () => {
  beforeEach(() => {
    mockRedis = new Redis() as jest.Mocked<Redis>;
    dbService = new DatabaseService(mockRedis);
  });

  describe('set', () => {
    it('should save an entity to Redis', async () => {
      const mockEntity = {
        serialize: jest.fn().mockReturnValue('serializedValue'),
      };

      await dbService.set('user', 'testKey', mockEntity as any);

      expect(mockRedis.set).toHaveBeenCalledWith('user:testKey', 'serializedValue');
    });
  });

  describe('get', () => {
    it('should retrieve an entity from Redis', async () => {
      mockRedis.get.mockResolvedValue(JSON.stringify({ someKey: 'someValue' }));

      const result = await dbService.get('user', 'testKey');

      expect(result).not.toBeNull();
      expect(mockRedis.get).toHaveBeenCalledWith('user:testKey');
    });

    it('should return null if entity is not found in Redis', async () => {
      mockRedis.get.mockResolvedValue(null);

      const result = await dbService.get('user', 'nonExistentKey');

      expect(result).toBeNull();
    });
  });

  describe('del', () => {
    it('should delete an entity from Redis', async () => {
      await dbService.del('user', 'testKey');

      expect(mockRedis.del).toHaveBeenCalledWith('user:testKey');
    });
  });

  describe('Error Handling', () => {
    it('should throw an error if type or key is not provided for set', async () => {
      const mockEntity = {
        serialize: jest.fn().mockReturnValue('serializedValue'),
      };

      await expect(dbService.set('', 'testKey', mockEntity as any)).rejects.toThrow();
      await expect(dbService.set('user', '', mockEntity as any)).rejects.toThrow();
    });

    it('should throw an error if type or key is not provided for del', async () => {
      await expect(dbService.del('', 'testKey')).rejects.toThrow();
      await expect(dbService.del('user', '')).rejects.toThrow();
    });

    it('should throw an error if type or key is not provided for get', async () => {
      await expect(dbService.get('', 'testKey')).rejects.toThrow();
      await expect(dbService.get('user', '')).rejects.toThrow();
    });
  });
});
