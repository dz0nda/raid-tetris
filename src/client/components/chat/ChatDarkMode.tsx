import React from 'react';
import { ActionIcon } from '@mantine/core';
import { IconMoonStars, IconSun } from '@tabler/icons-react';

const DarkMode = () => {
  // const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = 'dark';
  return (
    <ActionIcon
      variant="outline"
      color={dark ? 'yellow' : 'blue'}
      // onClick={() => toggleColorScheme()}
      title="Toggle color scheme"
    >
      {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  );
};

export default DarkMode;
