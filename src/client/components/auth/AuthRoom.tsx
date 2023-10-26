import React, { FC, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  // Button,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';

import { Column } from '../table-sort/TableSort';
import { Room } from '@/client/interfaces/room.interface';
import { TextInput } from '@/mantine/TextInput';
import Button from '../mantine/Button';
import { RoomsList } from '../rooms/RoomsList';

// Styles
const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
  item: {
    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
    },
  },
  switch: {
    '& *': {
      cursor: 'pointer',
    },
  },
  title: {
    lineHeight: 1,
  },
}));

// Types
export interface AuthRoomFormValues {
  room: string;
  pass: string;
}

interface AuthRoomProps {
  username: string;
  onValidated: (values: AuthRoomFormValues) => void;
}

const columns: Column<Room>[] = [
  { key: (row) => row?.room || '', label: 'Name' },
  { key: (row) => row?.settings?.owner || '', label: 'Owner' },
  { key: (row) => row?.settings?.status || '', label: 'Status' },
  { key: (row) => row?.settings?.nbPlayers || '', label: 'Nb. Players' },
  { key: (row) => row?.settings?.dropTime, label: 'Drop Time' },
];

export const AuthRoom: FC<AuthRoomProps> = ({ username, onValidated }) => {
  const theme = useMantineTheme();
  const { classes } = useStyles();

  const form = useForm<AuthRoomFormValues>({
    initialValues: {
      room: '',
      pass: '',
    },
    validate: {
      room: (val) => (val.length <= 6 ? 'Room name should include at least 6 characters' : null),
    },
  });

  const [search, setSearch] = useState('');

  return (
    <Paper radius="md" p="md">
      <form
        onSubmit={form.onSubmit((values) => {
          onValidated(values);
        })}
      >
        <Stack>
          <SimpleGrid
            cols={2}
            spacing="md"
            breakpoints={[
              { maxWidth: 'sm', cols: 2, spacing: 'sm' },
              { maxWidth: 'xs', cols: 1, spacing: 'sm' },
            ]}
          >
            <TextInput
              label="Room"
              placeholder="Enter room name"
              {...form.getInputProps('room')}
              // value={search}
              onChange={(event) => {
                form.setFieldValue('room', event.currentTarget.value);
                setSearch(event.currentTarget.value);
              }}
              radius="lg"
            />

            <TextInput
              placeholder="Search by any field"
              label="Password"
              {...form.getInputProps('password')}
              // value={form.values.pass}
              disabled={false}
            />
          </SimpleGrid>

          <Group grow position="center" m="md">
            <Button type="submit">Join room</Button>
          </Group>
          <Stack spacing="xl" mt="xl">
            <Divider variant="dotted" />

            <RoomsList search={form.values.room} />
            {/* <Box>
              <Title fw={600} size="xl">
                Rooms
              </Title>
              {form.values.room.length > 0 && (
                <Text c="dimmed">
                  {` (results for `}
                  <Text fw={600} span>
                    {form.values.room}
                  </Text>
                  {`)`}
                </Text>
              )}
            </Box>

            <TableSort data={roomsListData} search={form.values.room} columns={columns} /> */}
          </Stack>
        </Stack>
      </form>
    </Paper>
  );
};
