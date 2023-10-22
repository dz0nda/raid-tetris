import express from 'express';
import { Server, createServer } from 'http';

export class HttpService {
  private http: Server;

  constructor() {
    this.http = createServer(express());
  }

  public getHttp(): Server {
    return this.http;
  }

  public listen(host: string, port: number) {
    this.http.listen(port, host, () => {
      console.log(`HTTP Server listening on ${host}:${port}`);
    });
  }

  public close() {
    this.http.close((err?: Error) => {
      console.log('HTTP server closed');
      process.exit(err ? 1 : 0);
    });
  }
}
