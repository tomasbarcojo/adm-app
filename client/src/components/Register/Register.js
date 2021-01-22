import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux'
import { addUser } from '../../actions/users'
import { useHistory } from 'react-router-dom'
import SnackBar from '../SnackBar/SnackBar'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const history = useHistory()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
  })

  const handleChange = (event) => {
    setData({...data, [event.target.name]: event.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // dispatch(addUser(data, history)) //add user
    return (
      <SnackBar />
    )
  }

  return (
    <div className='LoginPageOuterContainer'>
      <div className='LoginPageForm'>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Registro
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="Nombre"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Apellido"
                name="lastName"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Usuario"
                name="username"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Contraseña"
                type="password"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Aca puede ir algo como: RECIBIR MAILS CON NOVEDADES"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to='/'>
                ¿Ya tenes una cuenta?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </div>
  );
}