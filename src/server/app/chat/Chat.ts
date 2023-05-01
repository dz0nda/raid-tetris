import { v4 as uuidv4 } from 'uuid';

export interface IMessage {
  id: string;
  user: string;
  text: string;
  date: string;
}

export class Chat {
  channel: string;
  messages: IMessage[];

  constructor(channel: string) {
    this.channel = channel;
    this.messages = [];
  }

  getChannel() {
    return this.channel;
  }

  setMessage(user: string, text: string) {
    this.messages.push({
      id: uuidv4(),
      user,
      text,
      date: `${new Date().getHours()}h : ${new Date().getMinutes() < 10 ? '0' : ''}${new Date().getMinutes()}`,
    });
  }

  getMessages() {
    return this.messages;
  }
}
