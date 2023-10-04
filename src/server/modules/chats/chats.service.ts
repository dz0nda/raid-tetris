import { Chat, IMessage } from '@/server/app/chat/Chat';

export class ChatsService {
  chats: Record<string, Chat>;

  constructor() {
    this.chats = {};
  }

  private _setChat(channel: string): Chat {
    return (this.chats[channel] = new Chat(channel));
  }

  public getChat(channel: string): Chat | null {
    return this.chats[channel] || null;
  }

  public getChatMessages(channel: string): IMessage[] {
    return this.getChat(channel)?.getMessages() || [];
  }

  public getOrCreateChat(channel: string): Chat {
    return this.getChat(channel) || this._setChat(channel);
  }

  public unsetChat(room: string): void {
    delete this.chats[room];
  }

  public addMessage(channel: string, user: string, text: string): IMessage[] {
    const chat = this.getOrCreateChat(channel);
    chat.setMessage(user, text);
    return chat.getMessages();
  }
}
