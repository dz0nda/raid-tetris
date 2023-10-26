import { createMockedDatabaseModule } from '@/modules/database/database.mocks';
import { createMockedSocketService } from '@/modules/socket/socket.mocks';

import { ChatModule } from './chat.module';

describe('ChatModule', () => {
  let socketServiceMock: ReturnType<typeof createMockedSocketService>;
  let module: ChatModule;

  beforeEach(() => {
    createMockedDatabaseModule();
    socketServiceMock = createMockedSocketService();

    module = new ChatModule(socketServiceMock);
  });

  it('should initialize correctly', () => {
    expect(module).toBeInstanceOf(ChatModule);
    expect(module.service).toBeDefined();
    expect(module.controller).toBeDefined();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
