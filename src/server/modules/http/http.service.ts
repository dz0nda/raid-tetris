import express from 'express';
import { Server, createServer } from 'http';
import { Base } from '../utils/service';

/**
 * Provides functionalities for creating and managing an HTTP server.
 * @extends Base
 */
export class HttpService extends Base {
  private readonly http: Server;

  /**
   * Initializes a new HttpService instance and sets up an Express HTTP server.
   */
  constructor() {
    super('HttpService');
    this.http = createServer(express());
  }

  /**
   * Retrieves the internal HTTP server instance.
   * @returns {Server} The internal HTTP server instance.
   */
  public getHttp(): Server {
    return this.http;
  }

  /**
   * Starts the HTTP server on the given host and port.
   * @param host - Hostname for the server.
   * @param port - Port number for the server.
   */
  public listen(host: string, port: number): void {
    this.http.listen(port, host, () => {
      this.log(`Server listening on ${host}:${port}`);
    });
  }

  /**
   * Shuts down the HTTP server.
   */
  public close(): void {
    this.http.close((err?: Error) => {
      this.log('Server closed');
      // process.exit(err ? 1 : 0);
    });
  }
}
