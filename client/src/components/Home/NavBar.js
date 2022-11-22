import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Logo from '../../images/Logo/Logo4.png';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

export default function NavBar() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" color="primary" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <img className="ActivaLogo" src={Logo} alt="Activa SRL Logo" />
          {/* <Link href="/users">
            <img className='Logo' src={Logo} alt='Wispro Logo' />
          </Link>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Activa SRL
          </Typography>
          <nav>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Productos
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              ¿Quienes somos?
            </Link>
            <Link variant="button" color="textPrimary" href="#" className={classes.link}>
              Soporte
            </Link>
          </nav>
          <Button href="/" color="primary" variant="outlined" className={classes.link}>
            Desloguearse
          </Button> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}
