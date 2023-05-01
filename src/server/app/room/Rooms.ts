import { Room } from '@/server/app/room/Room';

export class Rooms {
  rooms: { [key: string]: Room };

  constructor() {
    this.rooms = {};
  }

  getRoom(room: string): Room | null {
    return this.rooms[room] || null;
  }

  getOrCreateRoom(room: string, name: string): Room {
    return this.getRoom(room) || (this.rooms[room] = new Room(room, name));
  }

  unsetRoom(room: string): void {
    delete this.rooms[room];
  }
}
