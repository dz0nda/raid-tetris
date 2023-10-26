import React from 'react';
import { Container, Text, Title } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '@/client/store';
// import { AuthFormValues } from '@/client/components/auth/AuthForm';
import { AuthRoom, AuthRoomFormValues } from '@/client/components/auth/AuthRoom';

import { reqJoinRoom, reqLogin } from '@/client/store/slices/user.slice';
import { selectUser } from '@/client/store/selectors/user.selectors';

import { LoginDto } from '@/server/modules/auth/auth.dto';

export const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onUsernameValidated = (values: LoginDto) => {
    dispatch(reqLogin({ name: values.username }));
  };

  const onRoomValidated = (values: AuthRoomFormValues) => {
    // Dispatch the request to join the room (if you have a separate action for this)
    dispatch(reqJoinRoom({ username: user.username, room: values.room, password: values.pass }));
  };

  return (
    <Container>
      <Title align="center" sx={() => ({ fontWeight: 900 })}>
        Rooms
      </Title>
      <Text align="center" size="md" c="dimmed">
        Choose or create a room to get started.
      </Text>
      <AuthRoom username={user.username} onValidated={onRoomValidated} />
    </Container>
  );
};
