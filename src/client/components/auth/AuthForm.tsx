import React, { FC, forwardRef } from 'react';
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
  Box,
} from '@mantine/core';
// import { GoogleButton, TwitterButton } from '../SocialButtons/SocialButtons';

const data = [
  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-bender.png',
    label: 'Bender Bending Rodríguez',
    value: 'Bender Bending Rodríguez',
    description: 'Fascinated with cooking',
  },

  {
    image: 'https://img.icons8.com/clouds/256/000000/futurama-mom.png',
    label: 'Carol Miller',
    value: 'Carol Miller',
    description: 'One of the richest people on Earth',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/homer-simpson.png',
    label: 'Homer Simpson',
    value: 'Homer Simpson',
    description: 'Overweight, lazy, and often ignorant',
  },
  {
    image: 'https://img.icons8.com/clouds/256/000000/spongebob-squarepants.png',
    label: 'Spongebob Squarepants',
    value: 'Spongebob Squarepants',
    description: 'Not just a sponge',
  },
];

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(({ image, label, description, ...others }: ItemProps, ref) => (
  <div ref={ref} {...others}>
    <Group noWrap>
      <Avatar src={image} />

      <div>
        <Text size="sm">{label}</Text>
        <Text size="xs" opacity={0.65}>
          {description}
        </Text>
      </div>
    </Group>
  </div>
));

export interface AuthFormValues {
  username: string;
}

interface Props {
  onValidated?: (values: AuthFormValues) => void;
}
export const AuthForm: FC<Props> = (props) => {
  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm<AuthFormValues>({
    initialValues: {
      username: '',
    },

    validate: {
      username: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  return (
    <Paper radius="md" p="xl">
      <form onSubmit={form.onSubmit(props.onValidated || console.log)}>
        <Stack>
          <Group grow position="center">
            <Stack px={20}>
              <TextInput
                label="Anonymous"
                placeholder="Your username"
                // value={form.values.username}
                // onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                radius="lg"
                {...form.getInputProps('username')}
              />

              <Box>
                <Divider label="Or sign in with a wallet" labelPosition="center" />
                <Group grow mb="md" mt="md">
                  <Button radius="xl" variant="outline" sx={{ color: 'black' }}>
                    Beacon
                  </Button>
                </Group>
              </Box>
            </Stack>
          </Group>
          <Group position="right" mt="xl">
            <Button type="submit" radius="xl">
              {upperFirst(type)}
            </Button>
          </Group>
        </Stack>
      </form>
    </Paper>
  );
};
