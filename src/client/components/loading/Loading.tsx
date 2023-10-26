import React from 'react';
import { Center, Loader } from '@mantine/core';

export const Loading = () => {
  return (
    <Center sx={{ flexGrow: 1 }}>
      <Loader color="red" />
    </Center>
  );
};

export default Loading;
