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
import { useSnackbar } from 'notistack'

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
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const history = useHistory()
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
  })
  const [errors, setErrors] = useState({})
  const [confirmPassword, setconfirmPassword] = useState('')

  const formValid = (data) => {
    let valid = true;

    // validate form errors being empty
    Object.values(data).forEach(val => {
      if (val === '') {
        valid = false;
      };
    });
  
    return valid;
  };

  const handleChange = (event) => {
    const { name, value } = event.target

    switch (name) {
      case "firstName":
        errors.firstName =
          value.length < 3 ? "Mínimo 3 caracteres requeridos" : "";
        break;
      case "lastName":
        errors.lastName =
          value.length < 3 ? "Mínimo 3 caracteres requeridos" : "";
        break;
      case "email":
        errors.email = (!/\S+@\S+\.\S+/.test(value)) ? "Email invalido" : "";
        break;
      case "username":
        errors.username = value.length < 3 ? "Mínimo 3 caracteres requeridos" : "";
        break;
      case "password":
        errors.password =
          value.length < 6 && (!/(?=.*[0-9])/.test(value)) ? "La contraseña debe tener 6 o más caracteres o es inválida" : "";
        break;
      default:
        break;
    }
    setData({ ...data, [event.target.name]: event.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (formValid(data)) {
      dispatch(addUser(data, history, enqueueSnackbar, closeSnackbar)) //add user
    } else {
      enqueueSnackbar('Todos los campos son obligatorios', {
        variant: 'warning',
        action: key => (
          <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
        ),
      })
    }
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
        <form className={classes.form} noValidate autoComplete='off' onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                label="Nombre"
                onChange={handleChange}
              />
              {errors.firstName && errors.firstName.length > 0 && (
                <span className="errorMessageRegister">{errors.firstName}</span>
              )}
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
              {errors.lastName && errors.lastName.length > 0 && (
                <span className="errorMessageRegister">{errors.lastName}</span>
              )}
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
              {errors.username && errors.username.length > 0 && (
                <span className="errorMessageRegister">{errors.username}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                label="Email"
                name="email"
                onChange={handleChange}
              />
              {errors.email && errors.email.length > 0 && (
                <span className="errorMessageRegister">{errors.email}</span>
              )}
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
              {errors.password && errors.password.length > 0 && (
                <span className="errorMessageRegister">{errors.password}</span>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirmar contraseña"
                type="password"
                onChange={(e) => setconfirmPassword(e.target.value)}
              />
              {confirmPassword !== data.password && (
                <span className="errorMessageRegister">No coinciden las contraseñas</span>
              )}
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