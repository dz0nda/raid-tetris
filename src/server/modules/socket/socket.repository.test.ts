import { createMockedDatabaseService } from '@/modules/utils/mock';
import { SocketRepository } from './socket.repository';
import { SocketEntity } from './socket.entity';

jest.mock('@/modules/database/database.service');

describe('SocketRepository', () => {
  let socketRepository: SocketRepository;
  let mockDbService: ReturnType<typeof createMockedDatabaseService>;

  beforeEach(() => {
    mockDbService = createMockedDatabaseService();
    socketRepository = new SocketRepository(mockDbService);
  });

  it('should set socket', async () => {
    const socketEntity = new SocketEntity('123');
    await socketRepository.setSocket(socketEntity);
    expect(mockDbService.set).toHaveBeenCalledWith('sockets', '123', socketEntity);
  });

  it('should get socket', async () => {
    const socketId = '123';
    const mockSocketEntity = new SocketEntity(socketId);
    mockDbService.get.mockResolvedValue(mockSocketEntity);

    const result = await socketRepository.getSocket(socketId);

    expect(result).toEqual(mockSocketEntity);
    expect(mockDbService.get).toHaveBeenCalledWith('sockets', socketId);
  });

  it('should delete socket', async () => {
    const socketId = '123';
    await socketRepository.deleteSocket(socketId);
    expect(mockDbService.del).toHaveBeenCalledWith('sockets', socketId);
  });

  it('should handle getSocket rejection', async () => {
    const socketId = '123';
    mockDbService.get.mockRejectedValue(new Error('DB error'));

    await expect(socketRepository.getSocket(socketId)).rejects.toThrow('DB error');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
