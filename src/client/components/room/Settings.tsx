import React from 'react';
import { Box, Button, Group, Select, Stack, Switch, Text, createStyles, rem } from '@mantine/core';
import { useAppSelector } from '@/client/store';
import { selectRoomOwnerById } from '@/client/store/selectors/room.selectors';
import { selectUser } from '@/client/store/selectors/user.selectors';

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

  select: {
    paddingTop: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]}`,
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

interface SwitchesCardProps {
  title: string;
  description: string;
  data: {
    title: string;
    description: string;
  }[];
}

const selectData = Array(50)
  .fill(0)
  .map((_, index) => `Item ${index}`);

export function Settings({ title, description, data }: SwitchesCardProps) {
  const { classes } = useStyles();
  const user = useAppSelector(selectUser);
  const owner = useAppSelector(selectRoomOwnerById('1'));

  const disabled = user.username !== owner;
  // console.log(disabled);

  const items = data.map((item) => (
    <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" color="dimmed">
          {item.description}
        </Text>
      </div>
      <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" disabled={disabled} />
    </Group>
  ));

  return (
    <Stack p="xl" className={classes.card}>
      <Select
        label="Owner"
        placeholder="Pick one"
        searchable
        nothingFound="No options"
        maxDropdownHeight={280}
        data={selectData}
        disabled={disabled}
      />
      <Box>{items}</Box>
      <Button variant="outline">Apply</Button>
    </Stack>
  );
}
