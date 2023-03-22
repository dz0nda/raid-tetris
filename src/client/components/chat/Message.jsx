import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createUseStyles } from 'react-jss';

// import { makeStyles } from '@material-ui/core/styles';
import Telegram from '@mui/icons-material/Telegram';
// import { chatStatePropTypes } from '../../reducers/reducers.types';

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

import { messagePropTypes } from '../../store/reducers/types';

function Message(props) {
  const { id, user, date, text } = props;

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
}

Message.propTypes = messagePropTypes;

export default Message;
