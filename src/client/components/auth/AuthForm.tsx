import React, { FC } from 'react';
import { useForm } from '@mantine/form';
import { Box, Button, Divider, Group, Paper, Stack, TextInput } from '@mantine/core';

export interface AuthFormValues {
  username: string;
}

interface AuthFormProps {
  onValidated: (values: AuthFormValues) => void;
}

const USERNAME_VALIDATION_MESSAGE = 'Username should include at least 6 characters';

const validateUsername = (username: string) => (username.length <= 6 ? USERNAME_VALIDATION_MESSAGE : null);

export const AuthForm: FC<AuthFormProps> = ({ onValidated }) => {
  const form = useForm<AuthFormValues>({
    initialValues: {
      username: '',
    },
    validate: {
      username: validateUsername,
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
                label="Anonymous"
                placeholder="Your username"
                radius="lg"
                {...form.getInputProps('username')}
              />

              <Box>
                <Divider label="Or sign in with a wallet" labelPosition="center" />
                <Group grow mb="md" mt="md">
                  <Button radius="xl" variant="outline" color="black">
                    Beacon
                  </Button>
                </Group>
              </Box>
            </Stack>
          </Group>

          <Group position="right" mt="xl">
            <Button type="submit" radius="xl">
              Login
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
