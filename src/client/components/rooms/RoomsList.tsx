import React, { FC } from 'react';
import { Box, Text, Title } from '@mantine/core';

import { Column, TableSort } from '@/components/table-sort/TableSort';
import { useAppSelector } from '@/client/store';
import { selectRooms } from '@/client/store/selectors/room.selectors';
import { RoomClient } from '@/client/store/slices/room.slice';

const columns: Column<RoomClient>[] = [
  { key: (row) => row?.room || '', label: 'Name' },
  { key: (row) => row?.owner || '', label: 'Owner' },
  { key: (row) => (row?.started ? 'Started' : 'Pending'), label: 'Status' },
  { key: (row) => Object.keys(row?.players).length, label: 'Players' },
  {
    key: (row) => (row?.private ? 'Private' : 'Public'),
    label: '',
  },
  // { key: (row) => row?.settings?.dropTime, label: 'Drop Time' },
];

type Props = {
  search?: string;
};

export const RoomsList: FC<Props> = ({ search = '' }) => {
  const rooms = useAppSelector(selectRooms);

  return (
    <Box>
      <Box my="md">
        <Title fw={600} size="xl">
          Rooms
        </Title>
        {search && search.length > 0 && (
          <Text c="dimmed">
            {` (results for `}
            <Text fw={600} span>
              {search}
            </Text>
            {`)`}
          </Text>
        )}
      </Box>

      <TableSort data={Object.values(rooms)} search={search} columns={columns} />
    </Box>
  );
};
