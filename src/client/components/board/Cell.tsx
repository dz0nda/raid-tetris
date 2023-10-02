import React, { FC } from 'react';
// import { Box } from '@mui/material';
import { Box, createStyles, rem } from '@mantine/core';

import { TETROMINOS } from '../../helpers/tetrominos';

const useStyles = createStyles((theme, props: any) => ({
  cell: {
    width: 'auto',
    height: props.stage === 'stagePlayers' ? rem(2) : rem(20),
    background: props.variant !== 'shadow' ? `rgba(${props.color}, 0.8)` : `rgb(0, 0, 0, 0.1)`,
    border: `${props.type === 0 ? '0px solid' : '1px solid'}`,
    borderBottomColor: props.variant !== 'shadow' ? `rgba(${props.color}, 0.1)` : `rgb(${props.color}, 0.8)`,
    borderRightColor: props.variant !== 'shadow' ? `rgba(${props.color}, 1)` : `rgb(${props.color}, 0.8)`,
    borderTopColor: props.variant !== 'shadow' ? `rgba(${props.color}, 1)` : `rgb(${props.color}, 0.8)`,
    borderLeftColor: props.variant !== 'shadow' ? `rgba(${props.color}, 0.3)` : `rgb(${props.color}, 0.8)`,
  },
}));

export interface CellProps {
  type: string | number;
  variant: string;
  stage?: string;
}

export const Cell: FC<CellProps> = (props) => {
  const { type, variant, stage } = props;
  const style = {
    type,
    color: TETROMINOS[type].color,
    variant,
    stage,
  };
  const { classes } = useStyles(style);

  return <Box className={classes.cell} />;
};

export const CellMemo = React.memo(Cell);
