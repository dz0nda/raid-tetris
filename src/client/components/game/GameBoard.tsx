import React, { FC } from 'react';
// import { connect } from 'react-redux'
import { CardContent, Divider, Grid } from '@mui/material';
import { createUseStyles } from 'react-jss';

import { Box, Card, Container, Group, Stack } from '@mantine/core';

import { keys } from '../../constants/keys';
import useKey from '../../hooks/useKey';
import useInterval from '../../hooks/useInterval';
// import { Box } from '@mui/material'
// import { playerStateProp, settingsProp } from '@/client/store/reducers/reducers.types'
// import actions from '../../actions'

// import GameBoard from '../../components/Game/GameBoard';
// import GameLoose from '../../components/Game/GameLoose'
import { reqMove, selectPlayer, selectRoom } from '@/client/store/reducers/app';

import { Stage } from '../board/Board';
import { useAppDispatch, useAppSelector } from '@/client/store';
import { createStage } from '@/server/helpers/gameHelper';
import { createStagePiece } from '@/server/helpers/gameHelper';
// import { selectRoomSettings } from '@/client/store/reducers/game';

const useStyles = createUseStyles({
  root: {
    height: '100%',
    width: '100%',
  },
  stage: {
    padding: '3%',
  },
});

function GameBoardComponent(props: any) {
  const { stage, stagePiece, score, lines, mallus } = props;
  const classes = useStyles();

  // const renderItem = (field, value) => (
  //   <Grid item xs={12}>
  //     <BoxInfo field={field} value={value} dark />
  //   </Grid>
  // )
  // const stage = Array.from(Array(20), () => new Array(10).fill([0, 'clear']))

  return (
    <Card>
      <Container size="xs">
        <Group position="center" grow>
          {/* <Grid item xs={8}> */}
          {/* <Box className={classes.stage}> */}
          <Stage stage={stage || createStage()} />
          {/* </Box> */}
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <Grid container direction="column">
            <Grid item>
              <CardContent>
                {/* <Grid container direction="column" spacing={1}>
                  <Grid item> */}
                <Stack>
                  <Stage stage={stagePiece.length ? stagePiece[0] : createStagePiece()} type="stagePiece" />

                  <Stage stage={stagePiece.length ? stagePiece[1] : createStagePiece()} type="stagePiece" />
                  <Stage stage={stage || createStage()} type="stagePlayers" />
                </Stack>

                {/* </Grid>
                </Grid> */}
              </CardContent>
            </Grid>
            <Divider variant="middle" />
            <Grid item>
              <CardContent>
                {/* <Grid container spacing={1}>
                    {renderItem('score', score, classes.item)}
                    {renderItem('lines', lines, classes.item)}
                    {renderItem('mallus', mallus, classes.item)}
                  </Grid> */}
              </CardContent>
            </Grid>
          </Grid>
          {/* </Grid> */}
        </Group>
      </Container>
    </Card>
  );
}

// GameBoardComponent.propTypes = {
//   stage: playerStateProp.stage.isRequired,
//   pieceOne: playerStateProp.stage.isRequired,
//   pieceTwo: playerStateProp.stage.isRequired,
//   score: playerStateProp.score.isRequired,
//   lines: playerStateProp.lines.isRequired,
//   mallus: playerStateProp.mallus.isRequired
// }

export const GameBoard: FC = () => {
  // const { settings, player, reqMove } = props;
  const player = useAppSelector(selectPlayer);
  const room = useAppSelector(selectRoom);
  const dispatch = useAppDispatch();

  // console.log(player);

  // const { started, nbPlayers, dropTime } = room.settings? room.settings : {};
  // const { stage, stagePiece, score, lines, mallus, rank, loose, win } = player;
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(player.loose || player.win);
  }, [player?.loose, player?.win]);

  const handleCloseLoose = () => {
    setOpen(false);
  };

  useInterval(() =>
    dispatch(
      reqMove({ keyCode: keys.KDOWN, started: room?.settings?.started || false, dropTime: room.settings.dropTime }),
    ),
  );
  useKey(
    (event: KeyboardEvent) => {
      console.log('key', event.keyCode);
      dispatch(reqMove({ keyCode: event.keyCode }));
    },
    room?.settings?.started || false,
    player?.loose || false,
  );

  return (
    <Card>
      <Container size="xs">
        <Group position="center" grow>
          {/* <Grid item xs={8}> */}
          {/* <Box className={classes.stage}> */}
          <Stage stage={player?.stage || createStage()} />
          {/* </Box> */}
          {/* </Grid> */}
          {/* <Grid item xs={4}> */}
          <Box>
            <Stack>
              <Stage stage={player?.stagePiece?.length ? player.stagePiece[0] : createStagePiece()} type="stagePiece" />

              <Stage stage={player?.stagePiece?.length ? player.stagePiece[1] : createStagePiece()} type="stagePiece" />
              <Stage stage={player?.stage || createStage()} type="stagePlayers" />
            </Stack>
          </Box>
          {/* </Grid> */}
        </Group>
      </Container>
    </Card>
  );
};

// GameBoard.propTypes = {
//   settings: PropTypes.shape(settingsProp).isRequired,
//   player: PropTypes.shape(playerStateProp).isRequired,
//   reqMove: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   settings: state.game.settings,
//   player: state.player,
// });

// const mapDispatchToProps = {
//   reqStartGame: actions.reqStartGame,
//   reqMove: actions.reqMove,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
