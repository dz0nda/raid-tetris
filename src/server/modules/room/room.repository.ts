import { DatabaseService } from '@/modules/database/database.service';
import { Room } from './room.entity';

export class RoomRepository {
  constructor(private dbService: DatabaseService) {}

  /**
   * Create / update a room by its name.
   *
   * @param room - The room object.
   * @returns The room if found, otherwise null.
   */
  async setRoom(room: Room): Promise<void> {
    return this.dbService.set('room', room.room, room);
  }

  /**
   * Fetches a room by its name.
   *
   * @param roomName - The room name.
   * @returns The room if found, otherwise null.
   */
  async getRoom(roomName: string): Promise<Room | null> {
    return this.dbService.get<Room>('room', roomName);
  }
}
