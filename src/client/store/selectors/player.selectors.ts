import { RootState } from '../index'; // Adjust the path accordingly

export const selectPlayers = (state: RootState) => state.player.players;
export const selectPlayerId = (id: string) => (state: RootState) => state.player.players[id];
