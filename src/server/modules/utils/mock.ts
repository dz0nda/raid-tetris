import Redis from 'ioredis';
import { Server as SocketIoServer } from 'socket.io';

import { DatabaseService } from '@/modules/database/database.service';

export function createMockedDatabaseService(): jest.Mocked<DatabaseService> {
  const mockRedis = new Redis() as jest.Mocked<Redis>;
  return new DatabaseService(mockRedis) as jest.Mocked<DatabaseService>;
}

export function createMockedSocketIoServer(): jest.Mocked<SocketIoServer> {
  return {
    on: jest.fn(),
    in: jest.fn().mockReturnThis(),
    to: jest.fn().mockReturnThis(),
    emit: jest.fn(),
  } as unknown as jest.Mocked<SocketIoServer>;
}
