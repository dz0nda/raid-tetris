import express from 'express';
import { Server, createServer } from 'http';
import { Base } from '../utils/service';

export class HttpService extends Base {
  private http: Server;

  constructor() {
    super('HttpService');
    this.http = createServer(express());
  }

  public getHttp(): Server {
    return this.http;
  }

  public listen(host: string, port: number) {
    this.http.listen(port, host, () => {
      this.log(`Server listening on ${host}:${port}`);
    });
  }

  public close() {
    this.http.close((err?: Error) => {
      this.log('Server closed');
      process.exit(err ? 1 : 0);
    });
  }
}
