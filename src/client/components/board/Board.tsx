import React, { FC, ReactElement } from 'react';
import { Grid, createStyles } from '@mantine/core';
import { Stage as StageType } from '@/shared/game/board';

interface StageProps {
  stage: StageType;
  type: string;
}

const useCellStyle = createStyles(() => ({
  board: {
    border: '1px solid black',
    // width: '30vh',
    // height: '70vh',
    background: 'black',
  },

  cell: {
    width: '0.5rem',
    height: '3rem',
    background: 'black',
    border: '1px solid black',
  },
}));

export const Stage: FC<StageProps> = ({ stage, type }): ReactElement => {
  const { classes } = useCellStyle();

  return (
    <Grid columns={stage[0].length} gutter={0}>
      {stage.map((row) =>
        row.map(([cellType, , cellVariant], x) => (
          <Grid.Col span={1} key={x} className={classes.cell} />
          // <Grid.Col span={1} key={x}>
          //   <Cell type={cellType} variant={cellVariant} stage={type} color={TETROMINOS[cellType].color} />
          // </Grid.Col>
        )),
      )}
    </Grid>
  );
};

export default React.memo(Stage);
