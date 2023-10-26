import React, { FC } from 'react';
import { Box, createStyles } from '@mantine/core';

interface CellStylesProps {
  type: string | number;
  color: string;
  variant: string;
  stage?: string;
}

const useStyles = createStyles((theme, { type, color, variant, stage }: CellStylesProps) => {
  const isShadow = variant === 'shadow';
  const commonBorderColor = isShadow ? `rgba(${color}, 0.8)` : `rgba(${color}, 1)`;

  return {
    cell: {
      width: stage === 'stagePlayers' ? '2rem' : '2rem',
      height: stage === 'stagePlayers' ? '2rem' : '2rem',
      background: isShadow ? `rgb(0, 0, 0, 0.1)` : `rgba(${color}, 0.8)`,
      border: type === 0 ? '0px solid' : '1px solid',
      borderBottomColor: isShadow ? `rgba(${color}, 0.1)` : commonBorderColor,
      borderRightColor: commonBorderColor,
      borderTopColor: commonBorderColor,
      borderLeftColor: isShadow ? commonBorderColor : `rgba(${color}, 0.3)`,
    },
  };
});

export type CellProps = CellStylesProps;

export const Cell: FC<CellProps> = (props) => {
  const { classes } = useStyles(props);
  return <Box className={classes.cell} />;
};

export default React.memo(Cell);
