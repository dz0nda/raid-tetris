import { DatabaseModule } from '@/modules/database/database.module';
import { SocketModule } from '@/modules/socket/socket.module';
import { HttpModule } from '@/modules/http/http.module';
import { Redis } from 'ioredis';
import { Base } from '../utils/service';

export class AppContext extends Base {
  private static instance: AppContext;
  public readonly dbModule: DatabaseModule;
  public readonly socketModule: SocketModule;
  public readonly httpModule: HttpModule;

  private constructor() {
    super('App');

    this.httpModule = HttpModule.getInstance();

    const redis = new Redis();
    this.dbModule = DatabaseModule.getInstance(redis);
    this.dbModule.redis.on('error', (error) => {
      this.err(`Redis connection error: ${error}`);
    });

    this.socketModule = new SocketModule(this.dbModule, this.httpModule);
  }

  public static getInstance(): AppContext {
    if (!AppContext.instance) {
      AppContext.instance = new AppContext();
    }
    return AppContext.instance;
  }

  get db() {
    return this.dbModule;
  }

  get http() {
    return this.httpModule;
  }

  get socket() {
    return this.socketModule;
  }
}
