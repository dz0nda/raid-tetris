import React from 'react';
import { Box, Button, Group, Select, Stack, Switch, Text, createStyles, rem } from '@mantine/core';

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

  const items = data.map((item) => (
    <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>{item.title}</Text>
        <Text size="xs" color="dimmed">
          {item.description}
        </Text>
      </div>
      <Switch onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
    </Group>
  ));

  return (
    <Stack p="xl" className={classes.card}>
      {/* <Text fz="lg" className={classes.title} fw={500}>
        {title}
      </Text>
      <Text fz="xs" c="dimmed" mt={3} mb="xl">
        {description}
      </Text> */}
      {/* <Group grow  noWrap spacing="xl"> */}
      <Select
        label="Owner"
        placeholder="Pick one"
        searchable
        nothingFound="No options"
        maxDropdownHeight={280}
        data={selectData}
      />
      {/* </Group> */}
      <Box>{items}</Box>
      <Button variant="outline">Apply</Button>
    </Stack>
  );
}
