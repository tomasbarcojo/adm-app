import React from 'react';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import SideBar from '../../Dashboard/SideBar';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
}));

export default function Suppliers() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <SideBar /> */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Button variant="contained" color="primary" className={classes.button} startIcon={<AddIcon />}>
              Nuevo proveedor
            </Button>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
