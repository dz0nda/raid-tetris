import React, { useState } from 'react';
import { ActionIcon, Group, Stack, TextInput } from '@mantine/core';
import { getHotkeyHandler } from '@mantine/hooks';
// import toast from 'react-hot-toast';
import { IconSend } from '@tabler/icons-react';

interface ChatBoxProps {
  onSendMessage: () => void;

  messageId: string;

  replyInfo: {
    senderId: string;
    messageText: string;
  };
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage, messageId, replyInfo }) => {
  const [value, setValue] = useState<string>('');

  const sendMessage = () => {
    if (value.length > 100) {
      console.error('Must not exceed 100 characters');
      setValue('');
    } else {
      onSendMessage();
      setValue('');
    }
  };

  return (
    <Stack sx={{ height: '8vh' }} justify="center" p={0}>
      <Group position="right" p="xs">
        <TextInput
          value={value}
          onChange={(event) => setValue(event.currentTarget.value)}
          sx={{ flexGrow: 1 }}
          placeholder="Say something nice . . . "
          onKeyDown={!/\S/.test(value) || value.length < 2 ? undefined : getHotkeyHandler([['Enter', sendMessage]])}
        />
        <ActionIcon onClick={sendMessage} variant="hover" size="lg" disabled={!/\S/.test(value) || value.length < 2}>
          <IconSend />
        </ActionIcon>
      </Group>
    </Stack>
  );
};

export default ChatBox;
