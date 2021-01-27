import React, { useState, useSelector } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import '../../App.css'
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const classes = useStyles();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const isLogged = useSelector(state => state.userLogged)
  const [data, setData] = useState({
    username: '',
    password: ''
  })
  // const [KeepLogIn, setKeepLogIn] = useState(false)

  // if (isLogged) {
  //   history.push('/dashboard')
  // }

  const handleChange = (event) => {
    setData({...data, [event.target.name]: event.target.value})
  }

  const handleClick = () => {
    enqueueSnackbar('Te logueaste!', { 
      variant: 'success',
      preventDuplicate: true,
  });
};

  return (
    <div className='LoginPageOuterContainer'>
      <div className='LoginPageForm'>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesion
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Usuario"
            name="username"
            autoComplete="username"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Mantener iniciada la sesion"
          />
          <Link to='/dashboard'>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Loguearse
            </Button>
          </Link>
          <Grid container>
            <Grid item xs>
              <Link to='/'>
                ¿Olvidaste la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/register'>
                ¿No tenes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
