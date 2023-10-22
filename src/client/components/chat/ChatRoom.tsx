import React, { useEffect, useRef, useState } from 'react';
import { ActionIcon, Alert, Container, Group, Paper, ScrollArea, Stack } from '@mantine/core';
import { useInView } from 'react-intersection-observer';
import { IconChevronDown } from '@tabler/icons-react';

import ChatBox from './ChatBox';
import { ChatMessage } from './ChatMessage';
import Loading from './ChatLoading';
import QuotaReached from './ChatQuotaReached';
// import NavBar from './ChatNavbar';
// import QuotaReached from './ChatQuotaReached';

/**
 * Message type definition.
 */
export interface Message {
  id: string;
  text: string;
  uid: string;
  createdAt: string;
  photoURL: string;
  deleted?: boolean;
  repliedTo?: string;
  ruid?: string;
  rtext?: string;
}

/**
 * Reply info type definition.
 */
interface ReplyInfo {
  senderId: string;
  messageText: string;
}

/**
 * ChatRoom component for displaying and interacting with chat messages.
 */
export const ChatRoom: React.FC<{ messages: Message[] }> = ({ messages }) => {
  // const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [quota, setQuota] = useState(false);
  const dummy = useRef<HTMLDivElement>(null);
  const [replyInfo, setReplyInfo] = useState<ReplyInfo[]>([]);
  const [replyId, setReplyId] = useState<string>('');

  useEffect(() => {
    // TODO: Fetch messages and user data here.
    // Removed Firebase-related code for fetching messages and user data.
  }, []);

  const goBot = () => {
    dummy.current?.scrollIntoView({ behavior: 'smooth' });
    setReplyId('');
  };

  const replyMessage = (params: any) => {
    // TODO: Fetch the message to reply to.
    // Removed Firebase-related code for fetching the message to reply to.
  };

  const { ref, inView } = useInView({
    delay: 600,
    threshold: 1,
  });

  return (
    <Container
      p={0}
      sx={{
        minHeight: '65vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {loading ? (
        <Loading />
      ) : quota ? (
        <QuotaReached />
      ) : (
        // <QuotaReached />
        <>
          {/* <NavBar /> */}
          <Stack sx={{ height: '65' }} p={0}>
            <ScrollArea p="xs" scrollbarSize={1} sx={{ height: '65vh' }}>
              <Stack>
                <Group hidden={inView} position="center" pt="xs">
                  <Paper shadow="md" radius="xl" withBorder p={0} sx={{ position: 'absolute', top: '95%' }}>
                    <ActionIcon color="violet" radius="xl" onClick={goBot}>
                      <IconChevronDown />
                    </ActionIcon>
                  </Paper>
                </Group>

                {messages.map((msg, id) => (
                  <ChatMessage key={id} message={msg} replyMessage={replyMessage} />
                ))}
              </Stack>
              <div ref={ref}></div>
              <div ref={dummy}></div>
            </ScrollArea>

            {replyInfo.map((data, id) => (
              <Alert
                key={id}
                sx={{ minHeight: '10%' }}
                title={`Replying to ` + data.senderId}
                color="gray"
                p="xs"
                radius={0}
                withCloseButton
                onClose={() => setReplyId('')}
              >
                {data.messageText}
              </Alert>
            ))}
          </Stack>
          <ChatBox onSendMessage={goBot} messageId={replyId} replyInfo={replyInfo[0]} />
        </>
      )}
    </Container>
  );
};

export default ChatRoom;
