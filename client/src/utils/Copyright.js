import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  copy: {
    position: 'relative',
    color: 'black',
  },
}));

export default function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.copy} align="center">
      {'Copyright © '}
      <Link className={classes.copy} to="/">
        Activa SRL
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
