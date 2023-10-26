import { RootState } from '../index'; // Adjust the path accordingly

export const selectRooms = (state: RootState) => state.room.rooms;
export const selectRoomById = (id: string) => (state: RootState) => state.room.rooms[id];
export const selectRoomOwnerById = (id: string) => (state: RootState) => state.room.rooms[id].owner;

// export const selectRoom = createSelector(selectRooms, (rooms) => (id: string) => rooms[id]);
// export const selectRoomOwner = createSelector(selectRoom, (room) => room.owner);
// (state: RootState) => !state.user.isLogged;
