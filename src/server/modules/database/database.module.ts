import { Redis } from 'ioredis';
import { DatabaseService } from './database.service';

export class DatabaseModule {
  private static instance: DatabaseModule;
  private readonly redisInstance: Redis;
  private readonly serviceInstance: DatabaseService;

  /**
   * Initializes the DatabaseService with the provided Redis instance.
   *
   * @param redis - The Redis instance.
   *
   * @todo: Private constructor to enforce the singleton pattern.
   */
  constructor(redis: Redis) {
    this.redisInstance = redis;
    this.serviceInstance = new DatabaseService(this.redisInstance);
  }

  /**
   * Provides a singleton instance of the DatabaseModule.
   * If the module is being instantiated for the first time, a Redis instance must be provided.
   *
   * @param redis - The Redis instance (required for the first instantiation).
   * @returns The singleton instance of DatabaseModule.
   * @throws {Error} Throws an error if a Redis instance is not provided during the first instantiation.
   */
  public static getInstance(redis?: Redis): DatabaseModule {
    if (!DatabaseModule.instance) {
      if (!redis) {
        throw new Error('DatabaseModule requires a Redis instance.');
      }
      DatabaseModule.instance = new DatabaseModule(redis);
    }
    return DatabaseModule.instance;
  }

  /**
   * Provides access to the Redis instance used by the module.
   *
   * @returns The Redis instance.
   */
  get redis(): Redis {
    return this.redisInstance;
  }

  /**
   * Provides access to the DatabaseService instance for database operations.
   *
   * @returns The DatabaseService instance.
   */
  get service(): DatabaseService {
    return this.serviceInstance;
  }
}
