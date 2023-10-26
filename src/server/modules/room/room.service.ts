/* eslint-disable max-classes-per-file */

// import Io, { Request } from '@/server/server/Io';

// import { Socket } from 'socket.io-client';
import { Room } from './room.entity';
import { sha256 } from '../utils/crypto';
import { Base } from '../utils/service';
import { RoomRepository } from './room.repository';
import { GameService } from '../game/game.service';

export class RoomService extends Base {
  constructor(private readonly roomRepository: RoomRepository, private readonly gameService: GameService) {
    super('RoomService');
  }

  /**
   * Fetchs games from a room.
   *
   * @param roomName - The room name.
   */
  async getRoomGames(roomName: string): Promise<null> {
    const room = await this.roomRepository.getRoom(roomName);
    if (!room) {
      return null;
    }

    return null;

    // return room.games;
  }

  /**
   * Adds a user to a room.
   *
   * @param userId - The ID of the user.
   * @param roomName - The room name.
   * @param pass - The password for the room (optional).
   */
  public async joinRoom(userId: string, roomName: string, pass?: string): Promise<Room> {
    console.log(userId, roomName, pass);

    let room = await this.roomRepository.getRoom(roomName);

    if (!room) {
      room = new Room(sha256(roomName), roomName, pass);
    }
    if (room.pass && (!pass || !pass.length)) {
      throw new Error('Room requires a password.');
    }
    if (pass && pass.length) {
      const hashedPass = sha256(pass);
      if (room.pass !== hashedPass) {
        throw new Error('Invalid password.');
      }
    }
    room.setOwner(userId);
    room.addPlayer(userId);
    await this.roomRepository.setRoom(room);

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
    const room = await this.roomRepository.getRoom(roomName);
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

  /**
   * Change owner of a room.
   *
   * @param userId - The ID of the user.
   * @param roomName - The room name.
   */
  public async changeOwner(userId: string, roomName: string): Promise<Room> {
    const room = await this.roomRepository.getRoom(roomName);
    if (!room) {
      throw new Error('Room not found.');
    }
    if (!room.hasPlayer(userId)) {
      throw new Error('Player not in the room.');
    }
    room.setOwner(userId);
    await this.roomRepository.setRoom(room);

    return room;
  }
}
