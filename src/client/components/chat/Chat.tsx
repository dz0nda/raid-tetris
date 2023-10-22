import React, { FC, useState } from 'react';
import { Tabs } from '@mantine/core';

import { useAppSelector } from '@/client/store';
import { selectAppChats } from '@/client/store/selectors/chat.selectors';
import ChatRoom from './ChatRoom';

export const Chat: FC = () => {
  const chats = useAppSelector(selectAppChats);
  const [activeTab, setActiveTab] = useState<string | null>('general');

  return (
    <Tabs value={activeTab} onTabChange={setActiveTab}>
      <Tabs.List>
        {Object.keys(chats).map((key: string) => (
          <Tabs.Tab value={key}>#{key}</Tabs.Tab>
        ))}
      </Tabs.List>

      {Object.keys(chats).map((key: string) => (
        <Tabs.Panel value={key} pt="md">
          <ChatRoom messages={chats[key]} />
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
