import { Entity } from '../database/entities/Entity';

export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  ANONYMOUS = 'anonymous',
}

export class User extends Entity {
  id: string;
  username: string;
  password?: string;
  roomId?: string;
  socketId?: string;

  constructor(id: string, username: string, password?: string) {
    super();

    this.id = id;
    this.username = username;
    this.password = password;
  }

  /**
   * Check password.
   *
   * @param password The password to check.
   *
   * @returns True if the password is valid, false otherwise.
   */
  public checkPassword(password: string): boolean {
    return this.password === password;
  }
}
