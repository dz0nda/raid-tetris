import { DatabaseService } from '@/modules/database/database.service';
import { Chat } from './chat.entity';

export class ChatService {
  constructor(private dbService: DatabaseService) {}

  /**
   * Send a message to a specific chat channel.
   *
   * @param channel - The name of the chat channel.
   * @param user - The user sending the message.
   * @param text - The text of the message.
   *
   * @returns An updated array of messages for the channel.
   */
  public async sendMessage(channel: string, user: string, text: string): Promise<Chat> {
    const chat = (await this.dbService.get<Chat>('chat', channel)) || new Chat(channel);

    chat.setMessage(user, text);

    await this.dbService.set('chat', channel, chat);

    return chat;
  }

  /**
   * Retrieve all messages from a specific chat channel.
   *
   * @param channel - The name of the chat channel.
   *
   * @returns An array of messages for the channel, or null if the chat doesn't exist.
   */
  public async getMessages(channel: string): Promise<Chat | null> {
    return this.dbService.get<Chat>('chat', channel);
  }
}
