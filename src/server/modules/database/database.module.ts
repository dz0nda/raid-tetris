import { Redis } from 'ioredis';
import { DatabaseService } from './database.service';

export class DatabaseModule {
  private static instance: DatabaseModule;
  private readonly redisInstance: Redis;
  private readonly serviceInstance: DatabaseService;

  private constructor() {
    this.redisInstance = new Redis();
    this.serviceInstance = new DatabaseService(this.redisInstance);
  }

  /**
   * Provides a singleton instance of the DatabaseModule.
   * @returns The singleton instance of DatabaseModule.
   */
  public static getInstance(): DatabaseModule {
    if (!DatabaseModule.instance) {
      DatabaseModule.instance = new DatabaseModule();
    }
    return DatabaseModule.instance;
  }

  /**
   * Provides the Redis instance.
   * @returns The Redis instance.
   */
  get redis(): Redis {
    return this.redisInstance;
  }

  /**
   * Provides the DatabaseService instance.
   * @returns The DatabaseService instance.
   */
  get service(): DatabaseService {
    return this.serviceInstance;
  }
}
