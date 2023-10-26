import { v4 as uuidv4 } from 'uuid';
import { Entity } from '../database/entities/Entity';

export interface IMessage {
  id: string;
  user: string;
  text: string;
  date: string;
}

export class Chat extends Entity {
  id: string;
  messages: IMessage[];

  constructor(id: string) {
    super();

    this.id = id;
    this.messages = [];
  }

  getChannel() {
    return this.id;
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
