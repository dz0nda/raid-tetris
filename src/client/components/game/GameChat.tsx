import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { createUseStyles } from 'react-jss';

// import { makeStyles } from '@material-ui/core/styles';
// import { chatStatePropTypes } from '@/client/store/reducers/reducers.types';

import {
  Grid,
  CardContent,
  List,
  Paper,
  ListItem,
  InputBase,
  Typography,
  // IconButton,
  Box,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '@/client/store';
import { reqChat, selectAppChats } from '@/client/store/reducers/app';

// import { actions } from '@/client/store/reducers/app';

// import RedIconButton from '../Common/RedIconButton'

const useStyles = createUseStyles({
  grid: {
    height: '100%',
  },
  list: {
    height: '50vh',
    overflow: 'auto',
  },
  user: () => ({
    fontWeight: 'bold',
  }),
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  chatBoxInput: {
    marginLeft: '10px',
    flex: 1,
  },
});

function GameChat() {
  const chat = useAppSelector(selectAppChats);
  const dispatch = useAppDispatch();
  // const { chat, reqChat } = props;

  const [message, setMessage] = useState('');
  const scrollRef = useRef(null);
  const classes = useStyles();

  const handleMessage = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (!message) return;

    dispatch(reqChat({ message }));

    setMessage('');
  };

  useEffect(() => {
    // if (scrollRef.current) {
    //   scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    // }
  }, [chat]);

  const renderMessage = ({ id, user, date, text }: { id: string; user: string; date: string; text: string }) => {
    return (
      <ListItem key={id}>
        <Grid container>
          <Grid item container justifyContent="space-between">
            <Grid item>
              <Typography variant="body2" color={user === 'server' ? 'textSecondary' : 'textPrimary'} display="inline">
                {user}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" color="textSecondary">
                {date}
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="body2"
              color={user === 'server' ? 'textSecondary' : 'textPrimary'}
              style={{ fontStyle: user === 'server' ? 'italic' : 'normal' }}
            >
              {text}
            </Typography>
          </Grid>
        </Grid>
      </ListItem>
    );
  };

  const renderBox = () => {
    return (
      <Paper elevation={0}>
        <InputBase
          id="chatBoxInput"
          //   className={classes.chatBoxInput}
          placeholder="message..."
          value={message}
          onChange={handleMessage}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        {/* <IconButton className="chatBoxButton" onClick={handleSubmit}>
          <Telegram />
        </IconButton> */}
        {/* <RedIconButton className="chatBoxButton" onClick={handleSubmit}>
          <Telegram />
        </RedIconButton> */}
      </Paper>
    );
  };

  return (
    <Box style={{ height: '100%' }}>
      <Grid container alignItems="center" className={classes.grid}>
        <Grid item xs>
          <Paper variant="outlined" elevation={0}>
            <Grid container alignItems="center">
              <Grid xs>
                <List className={classes.list}>
                  {/* {chat.map((entryMessage) => renderMessage(entryMessage))} */}
                  <div ref={scrollRef} />
                </List>
                <CardContent>
                  <Grid container>
                    <Grid item xs>
                      {renderBox()}
                      {/* <GameChatBox message={message} handleMessage={handleMessage} handleSubmit={handleSubmit} /> */}
                    </Grid>
                  </Grid>
                </CardContent>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

// GameChat.propTypes = {
//   chat: chatStatePropTypes.isRequired,
//   reqChat: PropTypes.func.isRequired,
// };

// // export default GameChat
// const mapStateToProps = (state) => ({
//   chat: state.game.chat,
// });

// const mapDispatchToProps = {
//   reqChat: actions.reqChat,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(GameChat);
