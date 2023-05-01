import React, { FC, useState, forwardRef } from 'react';
import { useToggle, upperFirst, useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Modal,
  useMantineTheme,
  Select,
  Avatar,
  Switch,
  rem,
  createStyles,
  Box,
} from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { IconCheck, IconX } from '@tabler/icons-react';

import { RoomsList } from '@/client/components/rooms/RoomsList';

import { roomsListData } from '@/client/helpers/data';

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

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image} />

      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

export interface AuthRoomFormValues {
  room: string;
  password: string;
}

interface Props {
  username: string;
  onValidated?: (values: AuthRoomFormValues) => void;
}
export const AuthRoom: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const [type, toggle] = useToggle(['login', 'register']);
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState('');
  const form = useForm<AuthRoomFormValues>({
    initialValues: {
      room: '',
      password: '',
    },

    validate: {
      room: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
      // password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });
  const { classes } = useStyles();

  return (
    <Paper radius="md" p="md">
      <form onSubmit={form.onSubmit(props.onValidated || console.log)}>
        <Stack>
          <Text size="lg">
            Hi
            <Text span fw={500}>
              {` ${props.username}`}
            </Text>
            , choose or create a room to get started
          </Text>

          <Group grow position="center">
            <Stack px={20}>
              <Box>
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
                    value={''}
                    size="xs"
                    disabled={!checked}
                    radius="lg"
                  />
                  <Switch
                    checked={checked}
                    onChange={(event) => setChecked(event.currentTarget.checked)}
                    color="teal"
                    size="md"
                    // label="Switch with thumb icon"
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

                <RoomsList data={roomsListData} />
              </Box>
            </Stack>
          </Group>
          <Group position="center" m="md">
            <Button type="submit" size="md" radius="xl" variant="light" uppercase>
              {type}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
