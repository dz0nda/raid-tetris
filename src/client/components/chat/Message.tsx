import React, { FC } from 'react';
import { Alert, Group, Loader, Stack, Text } from '@mantine/core';

interface IMessage {
  id: string;
  user: string;
  date: string;
  text: string;
}

export const Message: FC<IMessage> = ({ id, user, date, text }) => {
  const loading = false;
  const color = 'teal';

  return (
    <Group position={'right'} align="flex-end" noWrap>
      <Stack p={0} spacing={2} sx={{ maxWidth: '80%' }} align="flex-end">
        <Group align="flex-end" spacing="xs">
          <Stack p={0} spacing={0} m={0}>
            <Stack p={0} spacing={0} m={0}>
              <Group
                align="center"
                style={{ position: 'relative', bottom: -8 }}
                p={0}
                spacing="xs"
                m={0}
                noWrap
                // position="apart"
              >
                {/* <IconCornerUpLeft size={15} /> */}
                <Text size="xs" p={0}>
                  {user}
                </Text>
                <Text size="xs" p={0} color="gray">
                  {date}
                </Text>
              </Group>
              <Group>
                <Alert
                  sx={{ bottom: '-10px', zIndex: -1 }}
                  color="gray"
                  // variant={repDel === undefined ? 'light' : 'outline'}
                  radius="lg"
                  py={8}
                >
                  {loading ? <Loader size="xs" color={color} /> : text}
                </Alert>
              </Group>
            </Stack>
          </Stack>
        </Group>
      </Stack>
    </Group>
  );
};
