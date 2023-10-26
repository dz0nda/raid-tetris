import { ISocketRepository } from '../socket.repository';
import { SocketEntity } from '../socket.entity';

// Creating individual mock functions for each method in the ISocketRepository
const mockSetSocket = jest.fn();
const mockGetSocket = jest.fn();
const mockDeleteSocket = jest.fn();

// Create a MockedSocketRepository class that uses the mocked functions
export class MockedSocketRepository implements ISocketRepository {
  async setSocket(socket: SocketEntity): Promise<void> {
    return mockSetSocket(socket);
  }

  async getSocket(socketId: string): Promise<SocketEntity | null> {
    return mockGetSocket(socketId);
  }

  async deleteSocket(socketId: string): Promise<void> {
    return mockDeleteSocket(socketId);
  }
}

// Export the mocked functions to allow tests to manipulate their behaviors
export { mockSetSocket, mockGetSocket, mockDeleteSocket };

// Export a default instance of the MockedSocketRepository for easy use in tests
export default new MockedSocketRepository();
