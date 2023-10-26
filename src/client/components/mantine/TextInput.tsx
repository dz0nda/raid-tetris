import React from 'react';
import { TextInput as MantineTextInput, TextInputProps } from '@mantine/core';

type CustomTextInputProps = TextInputProps & React.RefAttributes<HTMLInputElement>;

export const TextInput = React.forwardRef<HTMLInputElement, CustomTextInputProps>((props, ref) => {
  return <MantineTextInput {...props} ref={ref} radius={props.radius || 'lg'} />;
});

export default TextInput;
