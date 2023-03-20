import React from 'react';
import './login.css';

import userNameIcon from '../../images/username.svg';
import passwordNameIcon from '../../images/contraseña.svg';

const Login: React.FC = () => {
  return (
    <div className="loginContainer">
      <div className="loginLeft">
        <p className="welcomeTitle">¡Bienvenido de nuevo!</p>
        <div>
          <p className="firstTimeTile">¿Es la primera vez que ingresas?</p>
          <button
            className="registerButton"
            onClick={() => {
              alert('test');
            }}
          >
            Registrate
          </button>
        </div>
      </div>
      <div className="loginRight">
        <div className="loginForm">
          <p className="loginTitle">Inicio de sesión</p>
          <label className="usernameLabel">
            <img
              src={userNameIcon}
              className="icon icon-user"
              alt="Username Icon"
            />
            <input type="text" placeholder="Usuario" />
          </label>
          <label className="passwordLabel">
            <img
              src={passwordNameIcon}
              className="icon icon-user"
              alt="Password Icon"
            />
            <input type="password" placeholder="Contraseña" />
          </label>
        </div>
        <button>Ingresar</button>
        <div className="rememberOrForgottenPassword">
          <label>
            <input type="checkbox" id="cbox1" value="first_checkbox" />{' '}
            Recordarme
          </label>
          <p>¿Olvidaste tu contraseña?</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
