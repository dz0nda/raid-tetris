import { Chat } from '@/server/app/chat/Chat';

export class Chats {
  chats: { [key: string]: Chat };

  constructor() {
    this.chats = {};
  }

  getChat(chan: string): Chat | null {
    return this.chats[chan] || null;
  }

  getOrCreateChat(chan: string): Chat {
    return this.getChat(chan) || (this.chats[chan] = new Chat(chan));
  }

  unsetChat(room: string): void {
    delete this.chats[room];
  }
}
