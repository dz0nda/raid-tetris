import { DatabaseService } from '@/modules/database/database.service';
import { HttpService } from '@/modules/http/http.service';
import { createMockedDatabaseService, createMockedHttpService } from '../../utils/mock';
import { SocketService } from '../socket.service';

export class MockedSocketService {
  io = mockSocketIoServer;
  constructor(dbService: DatabaseService, httpService: HttpService) {}

  setSocket = jest.fn();
  getSocket = jest.fn();
  deleteSocket = jest.fn();
  connect = jest.fn();
  disconnecting = jest.fn();
  disconnect = jest.fn();
  ioOn = jest.fn();
  emitToRoom = jest.fn();
  emitToSocket = jest.fn();
}

export function createMockedSocketService(): jest.Mocked<SocketService> {
  const mockRepo = createMockedDatabaseService();
  const mockHttp = createMockedHttpService();

  return new SocketService(mockRepo, mockHttp) as jest.Mocked<SocketService>;
}
