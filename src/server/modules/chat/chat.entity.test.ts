import { Chat } from './chat.entity';

describe('Chat Entity', () => {
  let chat: Chat;
  const channelId = 'testChannelId';

  beforeEach(() => {
    chat = new Chat(channelId);
  });

  it('should correctly initialize a new Chat entity', () => {
    expect(chat).toBeInstanceOf(Chat);
    expect(chat.getChannel()).toEqual(channelId);
    expect(chat.getMessages()).toEqual([]);
  });

  it('should add a message using setMessage and retrieve it using getMessages', () => {
    const user = 'testUser';
    const text = 'Hello World';

    chat.setMessage(user, text);

    const messages = chat.getMessages();
    expect(messages.length).toEqual(1);
    expect(messages[0].user).toEqual(user);
    expect(messages[0].text).toEqual(text);

    // You can also check other properties of the message if you want, like ensuring the ID is correctly generated
    expect(messages[0].id).toBeDefined();

    // For the date, you might just want to ensure it's in the expected format, as matching exact times can be tricky in tests
    expect(messages[0].date).toMatch(/\d{1,2}h : \d{2}/);
  });

  it('should return the channel ID using getChannel', () => {
    expect(chat.getChannel()).toEqual(channelId);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
