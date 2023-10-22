import React from 'react';
import { Burger, Container, Group, Title, createStyles } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Header as MantineHeader } from '@mantine/core';

import { USER } from './constants';
import { UserMenu } from '../../components/user-menu/UserMenu';

const useStyles = createStyles((theme) => ({
  header: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },
}));

export const Header: React.FC = () => {
  const { classes } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);

  return (
    <MantineHeader height={{ base: 60 }} className={classes.header}>
      <Container py="sm">
        <Group position="apart" align="center" h="100%">
          <Title order={3}>Mantine</Title>

          <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

          <UserMenu user={USER} />
        </Group>
      </Container>
    </MantineHeader>
  );
};
