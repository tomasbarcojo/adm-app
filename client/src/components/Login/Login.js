import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link, Redirect, useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../actions/users';
import { useEffect } from 'react';

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
  const history = useHistory();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    username: '',
    password: '',
  });
  const [keepLogged, setKeepLogged] = useState(false);

  useEffect(() => {
    let logged;
    if (localStorage.length > 0 && localStorage.getItem('logged')) {
      logged = JSON.parse(localStorage.getItem('logged'));
    } else {
      logged = JSON.parse(sessionStorage.getItem('logged'));
    }
    if (logged) history.push('/admin');
  });

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    console.log(keepLogged);
    e.preventDefault();
    dispatch(userLogin(data, history, keepLogged, enqueueSnackbar, closeSnackbar));
  };

  return (
    <div className="LoginPageOuterContainer">
      <div className="LoginPageForm">
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesion
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Usuario"
            name="username"
            autoComplete="username"
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" onClick={() => setKeepLogged(true)} />}
            label="Mantener iniciada la sesion"
          />

          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            Loguearse
          </Button>

          <Grid container>
            <Grid item xs>
              <Link to="/admin">¿Olvidaste la contraseña?</Link>
            </Grid>
            <Grid item>
              <Link to="/register">¿No tenes una cuenta?</Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}
