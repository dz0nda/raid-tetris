import { Redis } from 'ioredis';

export class DatabaseService {
  constructor(private readonly db: Redis) {}

  set = jest.fn();
  del = jest.fn();
  get = jest.fn();
}
