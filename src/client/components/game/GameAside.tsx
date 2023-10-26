import React, { FC } from 'react';
import { Navbar, createStyles } from '@mantine/core';

import { Chat } from '@/client/components/chat/Chat';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },
}));

export const GameAside: FC = () => {
  const { classes } = useStyles();

  return (
    <Navbar width={{ base: 350 }} hidden={false} p="md" className={classes.navbar}>
      <Chat />
    </Navbar>
  );
};
