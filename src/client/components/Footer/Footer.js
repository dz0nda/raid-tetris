import React from 'react';
import { Grid, Typography, Link } from '@material-ui/core';

export default function Footer() {
  return (
    <Grid container justifyContent="center">
      <Typography variant="caption" color="textSecondary">
        <Link color="inherit" href="https://github.com/dz0nda">
          dzonda
        </Link>
      </Typography>
    </Grid>
  );
}
