import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Telegram from '@material-ui/icons/Telegram';
import { chatStatePropTypes } from '../../reducers/reducers.types';

import RedIconButton from '../Common/RedIconButton';

const useStyles = makeStyles((theme) => ({
  grid: {
    height: '100%',
  },
  list: {
    height: '49vh',
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
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

function GameChat(props) {
  const { chat, message, handleMessage, handleSubmit } = props;
  const scrollRef = useRef(null);
  const classes = useStyles();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behaviour: 'smooth' });
    }
  }, [chat]);

  const renderMessage = ({ id, user, date, text }) => {
    return (
      <ListItem key={id}>
        <Grid container>
          <Grid item container justify="space-between">
            <Grid item>
              <Typography
                variant="body2"
                color={user === 'server' ? 'textSecondary' : 'textPrimary'}
                className={classes.user}
                display="inline"
              >
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
              // className={classes.text({ user })}
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
      <Paper elevation={0} className={classes.root}>
        <InputBase
          id="chatBoxInput"
          className={classes.chatBoxInput}
          placeholder="message..."
          value={message}
          onChange={handleMessage}
          onKeyPress={(ev) => {
            if (ev.key === 'Enter') {
              handleSubmit();
            }
          }}
        />
        <RedIconButton className="chatBoxButton" onClick={handleSubmit}>
          <Telegram />
        </RedIconButton>
      </Paper>
    );
  };

  return (
    <Grid container alignItems="center" className={classes.grid}>
      <Grid item xs>
        <Paper variant="outlined" elevation={0}>
          <Grid container alignItems="center">
            <Grid item xs>
              <List className={classes.list}>
                {chat.map((entryMessage) => renderMessage(entryMessage))}
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
  );
}

GameChat.propTypes = {
  chat: chatStatePropTypes.isRequired,
  message: PropTypes.string.isRequired,
  handleMessage: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default GameChat;
