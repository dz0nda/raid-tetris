import { Socket } from 'socket.io';

export class SocketMap {
  private sockets: Record<string, Socket>;

  constructor() {
    this.sockets = {};
  }

  /**
   * Add or update a socket with a given ID.
   * @param id The unique identifier for the socket.
   * @param socket The socket instance.
   */
  set(id: string, socket: Socket): void {
    this.sockets[id] = socket;
  }

  /**
   * Retrieve a socket using its ID.
   * @param id The unique identifier for the socket.
   * @returns The socket instance or undefined if it doesn't exist.
   */
  get(id: string): Socket | undefined {
    return this.sockets[id];
  }

  /**
   * Check if a socket exists with a given ID.
   * @param id The unique identifier for the socket.
   * @returns True if the socket exists, otherwise false.
   */
  has(id: string): boolean {
    return !!this.sockets[id];
  }

  /**
   * Remove a socket with a given ID.
   * @param id The unique identifier for the socket.
   */
  delete(id: string): void {
    delete this.sockets[id];
  }
}
