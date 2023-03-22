import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import { connect } from 'react-redux'
import { Box, Grid, Card, CardContent, Divider } from '@mui/material'
import { css } from '@emotion/react'
import { createUseStyles } from 'react-jss'

import { keys } from '../../constants/keys'
import useKey from '../../hooks/useKey'
import useInterval from '../../hooks/useInterval'
// import { Box } from '@mui/material'
// import { playerStateProp, settingsProp } from '../../reducers/reducers.types'
// import actions from '../../actions'

// import GameBoard from '../../components/Game/GameBoard';
// import GameLoose from '../../components/Game/GameLoose'
import { actions } from '../../store/reducers/player'

import Stage from '../common/Board'

const useStyles = createUseStyles({
  root: {
    height: '100%',
    width: '100%'
  },
  stage: {
    padding: '3%'
  }
})

function GameBoardComponent(props) {
  const { stage, pieceOne, pieceTwo, score, lines, mallus } = props
  const classes = useStyles()

  // const renderItem = (field, value) => (
  //   <Grid item xs={12}>
  //     <BoxInfo field={field} value={value} dark />
  //   </Grid>
  // )
  // const stage = Array.from(Array(20), () => new Array(10).fill([0, 'clear']))

  return (
    <Card elevation={0}>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        className={classes.root}
      >
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
                {/* <Grid container spacing={1}>
                  {renderItem('score', score, classes.item)}
                  {renderItem('lines', lines, classes.item)}
                  {renderItem('mallus', mallus, classes.item)}
                </Grid> */}
              </CardContent>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

// GameBoardComponent.propTypes = {
//   stage: playerStateProp.stage.isRequired,
//   pieceOne: playerStateProp.stage.isRequired,
//   pieceTwo: playerStateProp.stage.isRequired,
//   score: playerStateProp.score.isRequired,
//   lines: playerStateProp.lines.isRequired,
//   mallus: playerStateProp.mallus.isRequired
// }

function GameBoard(props) {
  const { settings, player, reqMove } = props
  const { started, nbPlayers } = settings
  const {
    stage,
    stagePiece,
    score,
    lines,
    mallus,
    rank,
    dropTime,
    loose,
    win
  } = player
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    setOpen(loose || win)
  }, [loose, win])

  const handleCloseLoose = () => {
    setOpen(false)
  }

  useInterval(() => reqMove({ keyCode: keys.KDOWN }), started, dropTime)
  useKey((event) => reqMove({ keyCode: event.keyCode }), started, loose)

  return (
    <>
      <GameBoardComponent
        stage={stage}
        pieceOne={stagePiece[0]}
        pieceTwo={stagePiece[1]}
        score={score}
        lines={lines}
        mallus={mallus}
      />
      {/* <GameLoose
        rank={rank}
        nbPlayers={nbPlayers}
        open={open}
        handleClose={handleCloseLoose}
      /> */}
    </>
  )
}

// GameBoard.propTypes = {
//   settings: PropTypes.shape(settingsProp).isRequired,
//   player: PropTypes.shape(playerStateProp).isRequired,
//   reqMove: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  settings: state.game.settings,
  player: state.player
})

const mapDispatchToProps = {
  reqStartGame: actions.reqStartGame,
  reqMove: actions.reqMove
}

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard)
