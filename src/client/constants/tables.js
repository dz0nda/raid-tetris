export const TABLE_PLAYERS_SIZE = 250;

export const TABLE_PLAYERS_COLUMNS = [
  {
    dataKey: 'name',
    label: 'Name',
    width: 120,
  },
  {
    dataKey: 'score',
    label: 'Score',
    width: 80,
    numeric: true,
  },
  {
    dataKey: 'lines',
    label: 'Lines',
    width: 80,
    numeric: true,
  },
  {
    dataKey: 'stage',
    label: '',
    width: 80,
  },
];

export const TABLE_PLAYERS_RANK = [
  {
    dataKey: 'name',
    label: 'Name',
    width: 200,
  },
  {
    dataKey: 'score',
    label: 'Score',
    width: 120,
    numeric: true,
  },
  {
    dataKey: 'lines',
    label: 'Lines',
    width: 120,
    numeric: true,
  },
  {
    dataKey: 'mallus',
    label: 'Mallus',
    width: 120,
    numeric: true,
  },
  {
    dataKey: 'rank',
    label: 'Rank',
    width: 120,
    numeric: true,
  },
];

export const SIZE_CHAT = 400;

export default {
  TABLE_PLAYERS_SIZE,
  TABLE_PLAYERS_COLUMNS,
  SIZE_CHAT,
};
