import Redis from 'ioredis';

import { DatabaseService } from './database.service';
import { DatabaseModule } from './database.module';

export function createMockedDatabaseService(): jest.Mocked<DatabaseService> {
  const mockRedis = new Redis() as jest.Mocked<Redis>;
  return new DatabaseService(mockRedis) as jest.Mocked<DatabaseService>;
}

export function createMockedDatabaseModule(): {
  mockRedisInstance: jest.Mocked<Redis>;
  mockDbModuleInstance: DatabaseModule;
} {
  const mockRedisInstance = new Redis() as jest.Mocked<Redis>;

  jest.spyOn(DatabaseModule, 'getInstance').mockImplementation((redis?: Redis) => {
    if (redis) {
      mockRedisInstance;
    }
    return new DatabaseModule(mockRedisInstance);
  });

  return {
    mockRedisInstance,
    mockDbModuleInstance: DatabaseModule.getInstance(mockRedisInstance),
  };
}
