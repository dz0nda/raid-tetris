import React, { FC, forwardRef, useState } from 'react';
import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  Avatar,
  Box,
  Button,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  createStyles,
  rem,
  useMantineTheme,
} from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { IconCheck, IconX } from '@tabler/icons-react';

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    value: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking',
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    value: 'Carol Miller',
    description: 'One of the richest people on Earth',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    value: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    label: 'Spongebob Squarepants',
    value: 'Spongebob Squarepants',
    description: 'Not just a sponge',
  },
];

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

interface Props {
  username: string;
}
export const Rooms: FC<Props> = (props) => {
  const theme = useMantineTheme();
  const [type, toggle] = useToggle(['login', 'register']);
  const [checked, setChecked] = useState(false);
  const [search, setSearch] = useState('');
  const form = useForm({
    initialValues: {
      email: '',
      name: '',
      password: '',
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });
  const { classes } = useStyles();

  return (
    <Paper radius="md" p="md">
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
                placeholder="Search by any field"
                mb="md"
                label="Room"
                // icon={<IconSearch size="0.9rem" stroke={1.5} />}
                value={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
                radius="lg"
              />
              <Group spacing="xl" position="apart" className={classes.item} grow>
                <TextInput
                  placeholder="Search by any field"
                  mb="md"
                  label="Password"
                  // icon={<IconSearch size="0.9rem" stroke={1.5} />}
                  value={''}
                  // onChange={}
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

              {/* <RoomsList data={roomsListData} /> */}
              {/* <TextInput
                required
                // label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                error={form.errors.email && 'Invalid email'}
                radius="md"
                my="md"
              />
              <Select
                label="Choose employee of the month"
                placeholder="Pick one"
                itemComponent={SelectItem}
                data={data}
                searchable
                creatable
                getCreateLabel={(query) => `+ Create ${query}`}
                maxDropdownHeight={400}
                nothingFound="Nobody here"
                filter={(value, item) =>
                  item.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
                  item.description.toLowerCase().includes(value.toLowerCase().trim())
                }
              /> */}
            </Box>
          </Stack>
        </Group>
        <Group position="center" m="md">
          <Button type="submit" size="md" radius="xl" variant="light" uppercase>
            {type}
          </Button>
        </Group>
      </Stack>
    </Paper>
  );
};
