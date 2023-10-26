import { Redis } from 'ioredis';

import { Entity } from './entities/Entity';
import { User } from '../user/user.entity';
import { Chat } from '../chat/chat.entity';
import { SocketEntity as Socket } from '../socket/socket.entity';
import { Room } from '../room/room.entity';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ENTITY_MAP: Record<string, new (...args: any[]) => Entity> = {
  socket: Socket,
  user: User,
  room: Room,
  chat: Chat,
};

const REDIS_KEY_SEPARATOR = ':';

export class DatabaseService {
  constructor(private readonly _db: Redis) {
    if (!_db) {
      throw new Error('DatabaseService requires a Redis instance.');
    }
  }

  /**
   * Get the database instance.
   * @returns The database instance.
   */
  public get db(): Redis {
    return this._db;
  }

  /**
   * Generates a Redis key based on entity type and key.
   * @param type - The type of the entity.
   * @param key - The key of the entity.
   * @returns The generated Redis key.
   */
  private generateRedisKey(type: string, key: string): string {
    if (!type || !key) {
      throw new Error('Both type and key are required to generate a Redis key.');
    }
    return `${type}${REDIS_KEY_SEPARATOR}${key}`;
  }

  /**
   * Saves an entity to Redis.
   *
   * @param type - The type of the entity.
   * @param key - The key under which the entity should be stored.
   * @param value - The entity to be stored.
   *
   * @returns A promise that resolves when the entity has been saved.
   */
  async set<T extends Entity>(type: string, key: string, value: T): Promise<void> {
    const redisKey = this.generateRedisKey(type, key);
    await this.db.set(redisKey, value.serialize());
  }

  /**
   * Deletes an entity from Redis.
   *
   * @param type - The type of the entity.
   * @param key - The key under which the entity is stored.
   *
   * @returns A promise that resolves when the entity has been deleted.
   */
  async del(type: string, key: string): Promise<void> {
    const redisKey = this.generateRedisKey(type, key);
    await this.db.del(redisKey);
  }

  /**
   * Retrieves an entity from Redis.
   *
   * @param type - The type of the entity.
   * @param key - The key under which the entity is stored.
   *
   * @returns A promise that resolves to the retrieved entity, or null if not found.
   */
  public async get<T extends Entity>(type: string, key: string): Promise<T | null> {
    const redisKey = this.generateRedisKey(type, key);
    const serializedData = await this.db.get(redisKey);

    if (!serializedData) {
      return null;
    }

    const EntityClass = ENTITY_MAP[type];
    if (!EntityClass) {
      throw new Error(`Unknown entity type: ${type}`);
    }

    return Entity.deserialize(EntityClass, serializedData) as T;
  }
}
