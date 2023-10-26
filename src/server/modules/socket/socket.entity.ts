import { Entity } from '../database/entities/Entity';

export class SocketEntity extends Entity {
  id: string;
  userId?: string | null;

  constructor(id: string, user?: string | null) {
    super();

    this.id = id;
    this.userId = user;
  }
}
