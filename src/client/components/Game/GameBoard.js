import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';

import { playerStateProp } from '../../reducers/reducers.types';

import BoxInfo from '../Common/BoxInfo';
import Stage from '../Common/Stage';

const useStyles = makeStyles({
  root: {
    height: '100%',
    width: '100%',
  },
  stage: {
    padding: '3%',
  },
});

function GameBoard(props) {
  const { stage, pieceOne, pieceTwo, score, lines, mallus } = props;
  const classes = useStyles();

  const renderItem = (field, value) => (
    <Grid item xs={12}>
      <BoxInfo field={field} value={value} dark />
    </Grid>
  );

  return (
    <Card>
      <Grid container justify="center" alignItems="center" className={classes.root}>
        <Grid item xs={8}>
          <Box className={classes.stage}>
            <Stage stage={stage} />
          </Box>
        </Grid>
        <Grid item xs={4}>
          <Grid container direction="column">
            <Grid item>
              <CardContent>
                <Grid container direction="column" spacing={1}>
                  <Grid item>
                    <Stage stage={pieceOne} type="stagePiece" />
                  </Grid>
                  <Grid item>
                    <Stage stage={pieceTwo} type="stagePiece" />
                  </Grid>
                </Grid>
              </CardContent>
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <CardContent>
                <Grid container spacing={1}>
                  {renderItem('score', score, classes.item)}
                  {renderItem('lines', lines, classes.item)}
                  {renderItem('mallus', mallus, classes.item)}
                </Grid>
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

GameBoard.propTypes = {
  stage: playerStateProp.stage.isRequired,
  pieceOne: playerStateProp.stage.isRequired,
  pieceTwo: playerStateProp.stage.isRequired,
  score: playerStateProp.score.isRequired,
  lines: playerStateProp.lines.isRequired,
  mallus: playerStateProp.mallus.isRequired,
};

export default GameBoard;
