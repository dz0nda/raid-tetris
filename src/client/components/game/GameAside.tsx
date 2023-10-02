import React, { FC } from 'react';
import { Aside, createStyles, getStylesRef, rem } from '@mantine/core';
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
// import GameChat from './GameChat';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectPlayer, selectRoomOwner } from '@/client/store/reducers/app';

import { Chat } from '@/client/components/chat/Chat';

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
  const owner = useAppSelector(selectRoomOwner);
  const dispatch = useAppDispatch();

  return (
    <Aside width={{ sm: 300, md: 400 }} hidden={false} p="md" className={classes.navbar}>
      <Chat />
    </Aside>
  );
};
