import React, { FC, useState } from 'react';
import { useForm } from '@mantine/form';
import {
  Button,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
import { IconCheck, IconX } from '@tabler/icons-react';

import { Column, TableSort } from '../table-sort/TableSort';
import { Room } from '@/client/interfaces/room.interface';
import { roomsListData } from '@/client/helpers/data';

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

  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState('');

  return (
    <Paper radius="md" p="md">
      <form
        onSubmit={form.onSubmit((values) => {
          onValidated(values);
        })}
      >
        <Stack>
          <Text size="lg">
            Hi{' '}
            <Text span fw={500}>
              {username}
            </Text>
            , choose or create a room to get started
          </Text>

          <Group grow position="center">
            <Stack px={20}>
              <TextInput
                placeholder="My room"
                mb="md"
                label="Room"
                {...form.getInputProps('room')}
                value={search}
                onChange={(event) => {
                  form.setFieldValue('room', event.currentTarget.value);
                  setSearch(event.currentTarget.value);
                }}
                radius="lg"
              />

              <Group spacing="xl" position="apart" className={classes.item} grow>
                <TextInput
                  placeholder="Search by any field"
                  mb="md"
                  label="Password"
                  {...form.getInputProps('password')}
                  value={form.values.pass}
                  size="xs"
                  disabled={!checked}
                  radius="lg"
                />
                <Switch
                  checked={checked}
                  onChange={(event) => setChecked(event.currentTarget.checked)}
                  color="teal"
                  size="md"
                  className={classes.switch}
                  thumbIcon={
                    checked ? (
                      <IconCheck size="0.8rem" color={theme.colors.teal[theme.fn.primaryShade()]} stroke={3} />
                    ) : (
                      <IconX size="0.8rem" color={theme.colors.red[theme.fn.primaryShade()]} stroke={3} />
                    )
                  }
                />
              </Group>

              <Stack spacing="xl" mt="xl">
                <Title fw={600} size="xl">
                  Rooms
                </Title>
                <TableSort data={roomsListData} search={form.values.room} columns={columns} />
              </Stack>
            </Stack>
          </Group>

          <Group position="center" m="md">
            <Button type="submit" size="md" radius="xl" variant="light" uppercase>
              Login
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
