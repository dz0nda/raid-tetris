import React from 'react';
import { Container, Stack, Title } from '@mantine/core';

import { useAppDispatch, useAppSelector } from '@/client/store';
import { AuthForm, AuthFormValues } from '@/client/components/auth/AuthForm';
import { AuthRoom, AuthRoomFormValues } from '@/client/components/auth/AuthRoom';

import { reqJoinRoom, reqLogin } from '@/client/store/slices/user.slice';
import { selectUser } from '@/client/store/selectors/user.selectors';

export const Home = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const onUsernameValidated = (values: AuthFormValues) => {
    dispatch(reqLogin({ name: values.username }));
  };

  const onRoomValidated = (values: AuthRoomFormValues) => {
    // Dispatch the request to join the room (if you have a separate action for this)
    dispatch(reqJoinRoom({ name: user.username, room: values.room, pass: values.pass }));
  };

  return (
    <Container>
      {user.username.length ? (
        <AuthRoom username={user.username} onValidated={onRoomValidated} />
      ) : (
        <Stack>
          <Title order={1} align="center">
            Login
          </Title>
          <AuthForm onValidated={onUsernameValidated} />
        </Stack>
      )}
    </Container>
  );
};
