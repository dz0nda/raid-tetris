import React, { FC } from 'react';
import { useForm } from '@mantine/form';
import { Box, Divider, Group, Paper, PasswordInput, Stack, Switch, Text, TextInput } from '@mantine/core';

import { LoginDto } from '@/server/modules/auth/auth.dto';
import Button from '@/components/mantine/Button';

interface AuthFormProps {
  onValidated: (values: LoginDto) => void;
}

const errorMinChar = (key: string, n: number) => `${key} should include at least ${n} characters`;

export const AuthForm: FC<AuthFormProps> = ({ onValidated }) => {
  const form = useForm<LoginDto>({
    initialValues: {
      username: '',
      password: '',
    },
    validate: {
      username: (username: string) => (username.length <= 2 ? errorMinChar('username', 2) : null),
      password: (password: string | undefined) =>
        password && password.length > 0 && password.length <= 2 ? errorMinChar('password', 2) : undefined,
    },
  });

  return (
    <Paper radius="md" p="xl">
      <form
        onSubmit={form.onSubmit((values) => {
          onValidated(values);
        })}
      >
        <Stack>
          <Group grow position="center">
            <Stack px={20}>
              <TextInput
                id="auth-input-username"
                label="Username"
                placeholder="Your username"
                radius="lg"
                {...form.getInputProps('username')}
              />

              <PasswordInput
                id="auth-input-password"
                label={
                  <Group>
                    <Text>Password</Text>
                    <Switch size="xs" onLabel="ON" offLabel="OFF" />
                  </Group>
                }
                placeholder="Your password"
                radius="lg"
                {...form.getInputProps('password')}
              />

              <Group position="right" mt="xl">
                <Button fullWidth type="submit" disabled={form.values.username.length < 3}>
                  Login
                </Button>
              </Group>
              <Box>
                <Divider label="Or sign in with a wallet" labelPosition="center" />
                <Group grow mb="md" mt="md">
                  <Button radius="xl" variant="outline" color="black" disabled>
                    Beacon
                  </Button>
                </Group>
              </Box>
            </Stack>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
