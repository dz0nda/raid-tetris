import React from 'react';
import { ButtonProps, Button as MantineButton } from '@mantine/core';

type CustomButtonProps = ButtonProps & React.RefAttributes<HTMLButtonElement>;

export const Button: React.FC<CustomButtonProps> = ({ radius = 'xl', size = 'md', variant = 'outline', ...props }) => {
  return <MantineButton {...props} radius={radius} size={size} variant={variant} />;
};

export default Button;
