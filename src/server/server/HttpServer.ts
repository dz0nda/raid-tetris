import express, { Application } from 'express';

const http = require('http');
const logger = require('pino')();

export class HttpServer {
  host: string;
  port: number;
  app: Application;
  server: any;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
  }

  public listen() {
    this.server.listen({ host: this.host, port: this.port }, () => {
      logger.info(`App running on http://${this.host}:${this.port}`);
    });

    // this.app.get;
  }

  public close() {
    this.server.close((err: Error) => {
      logger.info('server closed');
      process.exit(err ? 1 : 0);
    });
    // this.app.close();
  }
}
