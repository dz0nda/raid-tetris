import React, { FC } from 'react';
import { Text } from '@mantine/core';

interface Props {
  title: string;
  value: string;
}

export const Info: FC<Props> = (props) => (
  <div key={props.title}>
    <Text size="xs" color="dimmed">
      {props.title}
    </Text>
    <Text weight={500} size="sm">
      {props.value}
    </Text>
  </div>
);
