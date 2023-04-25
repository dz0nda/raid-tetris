import React, { FC, useState } from 'react';
import {
  Aside,
  SegmentedControl,
  Text,
  createStyles,
  getStylesRef,
  Group,
  Notification,
  Tabs,
  rem,
} from '@mantine/core';
// import {
//   IconShoppingCart,
//   IconLicense,
//   IconMessage2,
//   IconBellRinging,
//   IconMessages,
//   IconFingerprint,
//   IconKey,
//   IconSettings,
//   Icon2fa,
//   IconUsers,
//   IconFileAnalytics,
//   IconDatabaseImport,
//   IconReceipt2,
//   IconReceiptRefund,
//   IconLogout,
//   IconSwitchHorizontal,
// } from '@tabler/icons-react';
import { IconPhoto, IconMessageCircle, IconSettings } from '@tabler/icons-react';
import { CustomTabs } from '../common/CustomTabs';
// import GameChat from './GameChat';
import { RoomInfo } from './RoomInfo';
import { GameRoom } from './GameRoom';
import { useAppSelector } from '../../store';
import { selectPlayer } from '../../store/reducers/player';
import { Info } from '../common/Info';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  title: {
    textTransform: 'uppercase',
    letterSpacing: rem(-0.25),
  },

  link: {
    ...theme.fn.focusStyles(),
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    fontSize: theme.fontSizes.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
      color: theme.colorScheme === 'dark' ? theme.white : theme.black,

      [`& .${getStylesRef('icon')}`]: {
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,
      },
    },
  },

  linkIcon: {
    ref: getStylesRef('icon'),
    color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
    marginRight: theme.spacing.sm,
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      [`& .${getStylesRef('icon')}`]: {
        color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
      },
    },
  },

  footer: {
    borderTop: `${rem(1)} solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
    paddingTop: theme.spacing.md,
  },
}));

const tabs = {
  account: [
    // { link: '', label: 'Notifications', icon: IconBellRinging },
    // { link: '', label: 'Billing', icon: IconReceipt2 },
    // { link: '', label: 'Security', icon: IconFingerprint },
    // { link: '', label: 'SSH Keys', icon: IconKey },
    // { link: '', label: 'Databases', icon: IconDatabaseImport },
    // { link: '', label: 'Authentication', icon: Icon2fa },
    // { link: '', label: 'Other Settings', icon: IconSettings },
  ],
  general: [
    // { link: '', label: 'Orders', icon: IconShoppingCart },
    // { link: '', label: 'Receipts', icon: IconLicense },
    // { link: '', label: 'Reviews', icon: IconMessage2 },
    // { link: '', label: 'Messages', icon: IconMessages },
    // { link: '', label: 'Customers', icon: IconUsers },
    // { link: '', label: 'Refunds', icon: IconReceiptRefund },
    // { link: '', label: 'Files', icon: IconFileAnalytics },
  ],
};

const stats = [
  {
    title: 'Score',
    value: '27.4 km',
  },
  {
    title: 'Level',
    value: '9.6 km/h',
  },
  {
    title: 'Rank',
    value: '88/100',
  },
];

export const GameAside: FC = () => {
  const { classes, cx } = useStyles();
  // const [section, setSection] = useState<'account' | 'general'>('account');
  // const [active, setActive] = useState('Billing');
  const player = useAppSelector(selectPlayer);

  return (
    <Aside height={840} width={{ sm: 300, md: 500 }} p="md" className={classes.navbar}>
      <Aside.Section>
        <Text weight={500} size="sm" className={classes.title} color="dimmed" mb="xs">
          {player?.name || 'Player'}
        </Text>
      </Aside.Section>

      <Aside.Section className={classes.footer}>
        <Group>
          {stats.map((stat) => (
            <Info {...stat} />
          ))}
        </Group>
        {/* <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <span>Logout</span>
        </a> */}
      </Aside.Section>
      {/* <Aside.Section className={classes.footer}>
        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <span>Change account</span>
        </a>

        <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
          <span>Logout</span>
        </a>
      </Aside.Section> */}

      <Aside.Section mt="xl">
        <CustomTabs defaultValue="settings">
          <Tabs.List>
            <Tabs.Tab value="settings" icon={<IconSettings size="1rem" />}>
              Settings
            </Tabs.Tab>
            <Tabs.Tab value="players" icon={<IconSettings size="1rem" />}>
              Players
            </Tabs.Tab>
            <Tabs.Tab value="messages" icon={<IconMessageCircle size="1rem" />}>
              Messages
            </Tabs.Tab>
            <Tabs.Tab value="gallery" icon={<IconPhoto size="1rem" />}>
              Gallery
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="settings">
            <RoomInfo />
          </Tabs.Panel>
          <Tabs.Panel value="players">
            <GameRoom />
          </Tabs.Panel>
          <Tabs.Panel value="messages">{/* <GameChat /> */}</Tabs.Panel>
        </CustomTabs>
      </Aside.Section>
    </Aside>
  );
};
