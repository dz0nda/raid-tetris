import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

function FooterAuthors() {
  return (
    <Typography variant="caption" color="textSecondary">
      <Link color="inherit" href="https://github.com/jecombe">
        jecombe
      </Link>
      {' & '}
      <Link color="inherit" href="https://github.com/dz0nda">
        dzonda
      </Link>
      {' • '}
      {new Date().getFullYear()}
    </Typography>
  );
}

export default FooterAuthors;
