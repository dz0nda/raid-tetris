import { SocketService } from './socket.service';
import { SocketController } from './socket.controller';

export class SocketModule {
  public service: SocketService;
  public controller: SocketController;

  constructor(host: string, port: number) {
    this.service = new SocketService(host, port);
    this.controller = new SocketController(this.service);
  }
}
