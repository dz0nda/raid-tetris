import React, { FC } from 'react';
// import { createUseStyles } from 'react-jss';

// import { makeStyles } from '@material-ui/core/styles'

import { Grid, createStyles } from '@mantine/core';
import { Cell } from './Cell';

// const useCellStyles = createUseStyles({
//   cell: (props: any) => ({
//     width: 'auto',
//     background: props.variant !== 'shadow' ? `rgba(${props.color}, 0.8)` : `rgb(0, 0, 0, 0.1)`,
//     border: `${props.type === 0 ? '0px solid' : '1px solid'}`,
//     borderBottomColor: props.variant !== 'shadow' ? `rgba(${props.color}, 0.1)` : `rgb(${props.color}, 0.8)`,
//     borderRightColor: props.variant !== 'shadow' ? `rgba(${props.color}, 1)` : `rgb(${props.color}, 0.8)`,
//     borderTopColor: props.variant !== 'shadow' ? `rgba(${props.color}, 1)` : `rgb(${props.color}, 0.8)`,
//     borderLeftColor: props.variant !== 'shadow' ? `rgba(${props.color}, 0.3)` : `rgb(${props.color}, 0.8)`,
//   }),
// });

const useCellStyle = createStyles((theme, props: any) => ({
  board: {
    border: '1px solid black',
    width: '100%',
    // height: props.type === 'stagePlayers' ? rem(30) : 'auto',
    // padding: props.type === 'stagePiece' ? '5px' : 0,
    background: 'black',
  },
  cell: {
    // width: 'auto',
    // height: rem(1),
    background: props.variant !== 'shadow' ? `rgba(${props.color}, 0.8)` : `rgb(0, 0, 0)`,
    border: `${props.type === 0 ? '0px solid' : '0px solid'}`,
    borderBottomColor: props.variant !== 'shadow' ? `rgba(${props.color}, 0.1)` : `rgb(${props.color}, 0.8)`,
    borderRightColor: props.variant !== 'shadow' ? `rgba(${props.color}, 1)` : `rgb(${props.color}, 0.8)`,
    borderTopColor: props.variant !== 'shadow' ? `rgba(${props.color}, 1)` : `rgb(${props.color}, 0.8)`,
    borderLeftColor: props.variant !== 'shadow' ? `rgba(${props.color}, 0.3)` : `rgb(${props.color}, 0.8)`,
  },
}));

// const Cell = styled.

// function Cell({ type, variant }: { type: any; variant: string }) {
//   // const { type, variant } = props;
//   const style = {
//     type,
//     color: TETROMINOS[type].color,
//     variant,
//   };
//   const classes = useCellStyles(style);

//   return <Box className={classes.cell} />;
// }

// Cell.defaultProps = {
//   type: 0,
// };

// Cell.propTypes = {
//   type: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
//   variant: PropTypes.string.isRequired,
// };

// const CellMemo = React.memo(Cell);

// const useStyles = createUseStyles({
//   stage: (props: any) => ({
//     display: 'grid',
//     gridTemplateRows: `repeat(
//       ${props.height},
//       calc(${props.size}vh / ${props.width}))`,
//     gridTemplateColumns: `repeat(${props.width}, 1fr)`,
//     gridGap: '1px',
//     border: '1px solid black',
//     width: '100%',
//     padding: props.type === 'stagePiece' ? '5px' : 0,
//     background: 'black',
//   }),
// });

export const Stage: FC<any> = (props: any) => {
  const { stage, type } = props;

  let size = 30;
  if (type === 'stagePlayers') size = 2.5;
  if (type === 'stagePiece') size = 9;
  const style = {
    width: stage[0].length,
    height: stage.length,
    size,
    type,
  };
  // const classes = useStyles(style);

  const cellStyle = {
    type,
    color: '#fff',
    variant: 'block',
  };
  const { classes } = useCellStyle(cellStyle);

  // console.log(stage);

  return (
    <Grid columns={stage[0].length} className={classes.board} gutter={0}>
      {stage.map((row: any) =>
        row.map((cell: any, x: any) => (
          <Grid.Col span={1}>
            <Cell key={x} type={cell[0]} variant={cell[2]} stage={type} />
          </Grid.Col>
        )),
      )}
    </Grid>
  );
  // return (
  //   <Paper className={classes.stage}>
  //     {stage.map((row: any) => row.map((cell: any, x: any) => <CellMemo key={x} type={cell[0]} variant={cell[2]} />))}
  //   </Paper>
  // );
};

// Stage.defaultProps = {
//   type: '',
// };

// Stage.propTypes = {
//   stage: PropTypes.arrayOf(
//     PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string]))),
//   ).isRequired,
//   type: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
// };

export default React.memo(Stage);
