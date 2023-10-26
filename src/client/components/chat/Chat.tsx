import React, { FC, useState } from 'react';
import { Container, ScrollArea, Stack, Tabs } from '@mantine/core';

import { useAppSelector } from '@/client/store';
import { selectAppChats } from '@/client/store/selectors/chat.selectors';
import Loading from '@/components/loading/Loading';
import { ChatMessage } from './ChatMessage';
import ChatBox from './ChatBox';

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
          {/* <ChatRoom messages={chats[key]} /> */}
          <Container
            p={0}
            sx={{
              minHeight: '65vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {chats[key].length === 0 ? (
              <Loading />
            ) : (
              <>
                <Stack sx={{ height: '65' }} p={0}>
                  <ScrollArea p="xs" scrollbarSize={1} sx={{ height: '65vh' }}>
                    <Stack>
                      {chats[key].map((msg, id) => (
                        <ChatMessage key={id} message={msg} />
                      ))}
                    </Stack>
                  </ScrollArea>
                </Stack>
                <ChatBox
                  onSendMessage={() => {
                    // TODO: Implement
                  }}
                />
              </>
            )}
          </Container>
        </Tabs.Panel>
      ))}
    </Tabs>
  );
};
