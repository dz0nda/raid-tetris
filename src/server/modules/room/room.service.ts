/* eslint-disable max-classes-per-file */

// import Io, { Request } from '@/server/server/Io';

// import { Socket } from 'socket.io-client';
import { DatabaseService } from '@/modules/database/database.service';
import { Room } from './room.entity';
import { sha256 } from '../utils/crypto';

export class RoomService {
  constructor(private dbService: DatabaseService) {}

  /**
   * Create / update a room by its name.
   *
   * @param room - The room object.
   * @returns The room if found, otherwise null.
   */
  async setRoom(room: Room): Promise<void> {
    this.dbService.set('room', room.room, room);
  }

  /**
   * Fetches a room by its name.
   *
   * @param roomName - The room name.
   * @returns The room if found, otherwise null.
   */
  async getRoom(room: string): Promise<Room | null> {
    return this.dbService.get<Room>('room', room);
  }

  /**
   * Adds a user to a room.
   *
   * @param userId - The ID of the user.
   * @param roomName - The room name.
   * @param pass - The password for the room (optional).
   */
  public async joinRoom(userId: string, roomName: string, pass?: string): Promise<Room> {
    let room = await this.getRoom(roomName);
    if (!room) {
      room = new Room(roomName, pass);
    }
    if (room.pass && !pass) {
      throw new Error('Room requires a password.');
    }
    if (pass) {
      const hashedPass = sha256(pass);
      if (room.pass !== hashedPass) {
        throw new Error('Invalid password.');
      }
    }
    room.setOwner(userId);
    room.addPlayer(userId);
    await this.setRoom(room);

    return room;
  }

  /**
   * Start a game in a room.
   *
   * @param roomName - The room name.
   * @param userId - The ID of the user.
   * @param socketId - The ID of the socket.
   *
   * @returns The room if found, otherwise null.
   */
  public async startGame(roomName: string, userId: string, socketId: string): Promise<Room | null> {
    const room = await this.getRoom(roomName);
    if (!room) {
      throw new Error('Room not found.');
    }
    // if (room.owner !== userId) {
    //   throw new Error('Only the owner can start the game.');
    // }

    // room.startGame();
    // await this.setRoom(room);

    return room;
  }
}
