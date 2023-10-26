import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDisclosure } from '@mantine/hooks';
import { Container, Modal, Title } from '@mantine/core';

import { isUserLogged } from '@/client/store/selectors/user.selectors';
import { AuthForm } from './AuthForm';
import { useAppDispatch } from '@/client/store';
import { reqLogin } from '@/client/store/slices/user.slice';

export const AuthenticationModal: FC = () => {
  const isAuthenticated = useSelector(isUserLogged);
  const dispatch = useAppDispatch();
  const [opened, { open, close }] = useDisclosure(!isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      close();
    } else {
      open();
    }
  }, [isAuthenticated, close, open]);

  return (
    <Modal
      opened={opened}
      onClose={() => {
        // Do nothing
      }}
      withCloseButton={false}
      centered
      fullScreen
    >
      <Container size={420} my={40}>
        <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
          Welcome back!
        </Title>
        <AuthForm onValidated={(values) => dispatch(reqLogin(values))} />
      </Container>
    </Modal>
  );
};
