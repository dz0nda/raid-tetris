import { createSlice } from '@reduxjs/toolkit';
// import { Room } from '@/server/modules/rooms/room.entity';

export interface RoomClient {
  id: string;
  room: string;
  private: boolean;
  owner: string;
  started: boolean;
  players: Record<string, string>;
  settings: Record<string, string>;
}

interface RoomState {
  rooms: Record<string, RoomClient>;
}

export const generateRooms = (n: number) => {
  const rooms: Record<string, any> = {};

  for (let i = 1; i <= n; i++) {
    const roomKey = `room-${i}`;
    rooms[roomKey] = {
      id: roomKey,
      room: roomKey,
      private: true,
      owner: `player-${i}`,
      started: false,
      players: {
        '1': '1',
      },
      settings: {
        '1': '1',
      },
    };
  }

  return rooms;
};

const fakeInitialState = {
  '1': {
    id: '1',
    room: '1',
    owner: '1',
    started: false,
    players: {
      '1': '1',
    },
    settings: {
      '1': '1',
    },
  },
  '2': {
    id: '2',
    room: '2',
    owner: '2',
    started: false,
    players: {
      '2': '2',
    },
    settings: {
      '2': '2',
    },
  },
};

const initialState: RoomState = {
  rooms: generateRooms(12),
};

const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    reqStartGame() {
      // Do nothing
    },
    updateRoomSettings(state, action) {
      state.rooms[action.payload.room].settings = action.payload.settings;
    },
    updateRoomPlayers(state, action) {
      state.rooms[action.payload.room].players = action.payload.players;
    },
  },
});

export const { reqStartGame, updateRoomSettings, updateRoomPlayers } = roomSlice.actions;
export default roomSlice.reducer;
