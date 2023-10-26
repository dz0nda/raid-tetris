import React, { useState } from 'react';
import { Avatar, Group, Menu, Text, UnstyledButton, createStyles, rem } from '@mantine/core';
import { IconChevronDown, IconLogout, IconSettings, IconSwitchHorizontal } from '@tabler/icons-react';
import { useAppSelector } from '@/client/store';
import { selectIsLogged, selectUsername } from '@/client/store/reducers/app';
import { selectUser } from '@/client/store/selectors/user.selectors';
import { useDispatch } from 'react-redux';
import { reqLogout } from '@/client/store/slices/user.slice';

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    image: string;
  };
}

const useStyles = createStyles((theme) => ({
  user: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    // '&:hover': {
    //   backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
    // },

    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
  },
}));

export const UserMenu: React.FC<UserMenuProps> = ({ user: userIo }) => {
  const { classes, theme, cx } = useStyles();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const isLogged = useAppSelector(selectIsLogged);
  const username = useAppSelector(selectUsername);
  const user = useAppSelector(selectUser);
  const dispatch = useDispatch();

  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: 'pop-top-right' }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
      // disabled={!isLogged}
    >
      <Menu.Target>
        <UnstyledButton className={cx(classes.user, { [classes.userActive]: userMenuOpened })}>
          <Group spacing={7}>
            <Avatar radius="xl" size={25} />
            <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
              {user && user.username}
            </Text>
            <IconChevronDown size={rem(12)} stroke={1.5} />
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Label>Settings</Menu.Label>
        <Menu.Item icon={<IconSettings size="0.9rem" stroke={1.5} />}>Account settings</Menu.Item>
        <Menu.Item icon={<IconSwitchHorizontal size="0.9rem" stroke={1.5} />}>Change account</Menu.Item>
        <Menu.Item icon={<IconLogout size="0.9rem" stroke={1.5} />} onClick={() => dispatch(reqLogout({}))}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
