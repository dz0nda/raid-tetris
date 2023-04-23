import express from 'express';

const http = require('http');
const logger = require('pino')();

export default class Server {
  constructor(host, port) {
    this.host = host;
    this.port = port;
    this.app = express();
    this.server = http.createServer(this.app);
  }

  listen() {
    this.server.listen({ host: this.host, port: this.port }, () => {
      logger.info(`App running on http://${this.host}:${this.port}`);
    });
  }

  close() {
    this.server.close((err) => {
      logger.info('server closed');
      // process.exit(err ? 1 : 0)
    });
    // this.app.close();
  }
}
