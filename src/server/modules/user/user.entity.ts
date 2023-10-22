import { Entity } from '../database/entities/Entity';

export class User extends Entity {
  name: string;
  password?: string;
  room?: string; // -> room id
  socketId?: string; // -> socket id

  constructor(name: string, password?: string) {
    super();

    this.name = name;
    this.password = password;
  }
}
