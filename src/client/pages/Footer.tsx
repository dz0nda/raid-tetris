import React, { FC } from 'react';
import { Footer as MantineFooter, Center, Anchor } from '@mantine/core';

export const Footer: FC = () => {
  return (
    <MantineFooter height={60} p="md">
      <Center>
        <Anchor href="https://github.com/dz0nda" target="_blank" c="dimmed">
          dzonda
        </Anchor>
      </Center>
    </MantineFooter>
  );
};
