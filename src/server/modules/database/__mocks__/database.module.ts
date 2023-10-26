import { Redis } from 'ioredis';

export class DatabaseModule {
  private static instance: DatabaseModule;
  service = jest.fn();

  private constructor(public redis: Redis) {}

  public static getInstance(redis?: Redis): DatabaseModule {
    if (!this.instance) {
      if (!redis) {
        throw new Error('DatabaseModule requires a Redis instance.');
      }
      this.instance = new DatabaseModule(redis);
    }
    return this.instance;
  }
}
