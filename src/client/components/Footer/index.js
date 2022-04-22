import React from 'react';
import { Grid, Typography, Link } from '@mui/material';

const Footer = () => (
  <Grid container justify="center">
  <Typography variant="caption" color="textSecondary">
    <Link color="inherit" href="https://github.com/dz0nda">
      dzonda
    </Link>
    {' • '}
    {new Date().getFullYear()}
  </Typography>
</Grid>
);

export default Footer;
