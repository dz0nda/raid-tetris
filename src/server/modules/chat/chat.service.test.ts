import { createMockedDatabaseService } from '@/modules/utils/mock';

import { ChatService } from './chat.service';

jest.mock('ioredis');

describe('ChatService', () => {
  let mockDbService: ReturnType<typeof createMockedDatabaseService>;
  let chatService: ChatService;

  beforeEach(() => {
    mockDbService = createMockedDatabaseService();
    chatService = new ChatService(mockDbService);
  });

  it('should send a message and get all messages for a channel', async () => {
    const channel = 'testChannel';
    const user = 'John';
    const text = 'Hello!';

    const { messages } = await chatService.sendMessage(channel, user, text);

    expect(messages.length).toEqual(1);
    expect(messages[0].user).toEqual(user);
    expect(messages[0].text).toEqual(text);

    expect(messages[0].id).toBeDefined();
    expect(messages[0].date).toBeDefined();
  });

  // it('should accumulate messages for the same channel', async () => {
  //   const channel = 'testChannel';
  //   chatService.sendMessage(channel, 'John', 'Hello!');
  //   chatService.sendMessage(channel, 'Jane', 'Hi!');

  //   const chat = await chatService.sendMessage(channel, 'John', 'How are you?');

  //   expect(chat.getMessages()).toEqual([
  //     { user: 'John', text: 'Hello!' },
  //     { user: 'Jane', text: 'Hi!' },
  //     { user: 'John', text: 'How are you?' },
  //   ]);
  // });

  // it('should keep messages for different channels separate', async () => {
  //   chatService.sendMessage('channel1', 'John', 'Hello!');
  //   chatService.sendMessage('channel2', 'Jane', 'Hi!');

  //   const chat1 = await chatService.sendMessage('channel1', 'John', 'How are you?');
  //   const chat2 = await chatService.sendMessage('channel2', 'Jane', 'What’s up?');

  //   expect(chat1.getMessages()).toEqual([
  //     { user: 'John', text: 'Hello!' },
  //     { user: 'John', text: 'How are you?' },
  //   ]);

  //   expect(chat2.getMessages()).toEqual([
  //     { user: 'Jane', text: 'Hi!' },
  //     { user: 'Jane', text: 'What’s up?' },
  //   ]);
  // });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
