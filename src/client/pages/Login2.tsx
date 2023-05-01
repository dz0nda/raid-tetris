import React, { forwardRef } from 'react';
import { useToggle, upperFirst, useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  PaperProps,
  Button,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Modal,
  useMantineTheme,
  Select,
  Avatar,
  rem,
  ActionIcon,
  Box,
} from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';
import { IconArrowLeft } from '@tabler/icons-react';

import { AuthForm, AuthFormValues } from '@/client/components/auth/AuthForm';
import { AuthRoom, AuthRoomFormValues } from '@/client/components/auth/AuthRoom';
import { Rooms } from '@/client/components/rooms/Rooms';
import { useAppDispatch } from '../store';
import { reqLogin } from '../store/reducers/app';

export const Login = () => {
  const [opened, { open, close }] = useDisclosure(true);
  const [step, toggle] = useToggle(['Username', 'Room']);
  const theme = useMantineTheme();
  const dispatch = useAppDispatch();
  const form = useForm({
    initialValues: {
      username: '',
      room: '',
      password: '',
    },
  });

  // const step = form.values.username.length > 0 ? 1 : 0;

  const onUsernameValidated = (values: AuthFormValues) => {
    form.setFieldValue('username', values.username);
    toggle();
  };

  const onRoomValidated = (values: AuthRoomFormValues) => {
    console.log('onRoomValidated', values);
    form.setFieldValue('room', values.room);
    form.setFieldValue('password', values.password);
    dispatch(reqLogin({ name: form.values.username, room: values.room }));
  };

  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        step === 'Username' ? (
          <Text weight={500}>{'Login'}</Text>
        ) : (
          <Group>
            <ActionIcon onClick={() => toggle()}>
              <IconArrowLeft />
            </ActionIcon>
            <Text weight={500}>{'Room'}</Text>
          </Group>
        )
      }
      // centered
      withCloseButton={false}
      closeOnEscape={false}
      closeOnClickOutside={false}
      radius="lg"
      shadow="md"
      size="xl"
      centered
      ml={rem(-55)}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      {step === 'Username' ? (
        <AuthForm onValidated={onUsernameValidated} />
      ) : (
        <AuthRoom username={form.values.username} onValidated={onRoomValidated} />
      )}
      {/* <Group position="right" mt="xl">
        <Button type="submit" radius="xl" variant="outline">
          {upperFirst('Next')}
        </Button>
      </Group> */}
    </Modal>
  );
};
