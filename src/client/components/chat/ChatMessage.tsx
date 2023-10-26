import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Collapse, Group, Stack, Text, Tooltip } from '@mantine/core';
import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';

export type Message = {
  id: string;
  text: string;
  uid: string;
  photoURL: string;
  createdAt: string | null;
  deleted?: boolean;
};

type ChatMessageProps = {
  message: Message;
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const { text, uid, photoURL, createdAt, deleted } = message;

  // TODO: Replace with the actual user's UID
  const currentUserUID = 'sampleUID';
  const messagePosition = uid === currentUserUID ? 'right' : 'left';

  const [msgDate, setMsgDate] = useState<string>('');
  const [hovered, setHovered] = useState<boolean>(false);
  const [opened, setOpen] = useState<boolean>(false);

  dayjs.extend(calendar);

  useEffect(() => {
    if (createdAt) {
      setMsgDate(dayjs(createdAt).calendar());
    } else {
      setMsgDate('Just now');
    }
  }, [createdAt]);

  return (
    <>
      <Group
        onMouseEnter={() => !deleted && setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        position={messagePosition}
        align="flex-end"
        noWrap
      >
        <Stack p={0} spacing={2} sx={{ maxWidth: '80%' }} align="flex-end">
          <Group position={messagePosition} align="flex-end" spacing="xs">
            <Tooltip label="Sender Name" position="right">
              <Avatar src={photoURL} radius="xl" hidden={messagePosition === 'right'} />
            </Tooltip>

            <Stack p={0} spacing={0} m={0}>
              <Group position={messagePosition}>
                <Alert
                  color="gray"
                  radius="lg"
                  py={8}
                  variant={!deleted ? 'light' : 'outline'}
                  onClick={() => setOpen(!opened)}
                >
                  {!deleted ? (
                    text
                  ) : (
                    <Text color="gray" size="xs">
                      Message removed
                    </Text>
                  )}
                </Alert>
              </Group>
            </Stack>
          </Group>
          <Collapse in={opened} px="xs">
            <Text size="xs" align={messagePosition} color="dimmed">
              {msgDate}
            </Text>
          </Collapse>
        </Stack>
      </Group>
    </>
  );
};
