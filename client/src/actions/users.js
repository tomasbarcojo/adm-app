import Swal from 'sweetalert2';
import '../App.css';
const { REACT_APP_URL_API } = process.env;

export const userLoginOld = (data, history, keepLogged, enqueueSnackbar, closeSnackbar) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/auth/local/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.status === 401) {
          enqueueSnackbar(`El usuario o contraseña son inválidos`, {
            variant: 'error',
            preventDuplicate: false,
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        } else if (response.status === 400) {
          enqueueSnackbar(`El usuario no existe, regístrese`, {
            variant: 'error',
            preventDuplicate: false,
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        } else if (response.status === 200) {
          if (keepLogged) {
            localStorage.setItem('userData', JSON.stringify(response.user));
            localStorage.setItem('access_token', JSON.stringify(response.access_token));
            localStorage.setItem('logged', true);
          } else {
            sessionStorage.setItem('userData', JSON.stringify(response.user));
            sessionStorage.setItem('access_token', JSON.stringify(response.access_token));
            sessionStorage.setItem('logged', true);
          }
          dispatch({
            type: 'LOGIN_USER',
            payload: response.user,
          });
          enqueueSnackbar(`Bienvenido, ${response.user.firstName}`, {
            variant: 'success',
            preventDuplicate: true,
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
          history.push('/admin/dashboard');
        } else {
          Swal.fire('Something went wrong :(', '', 'error');
          enqueueSnackbar(`Something went wrong :(`, {
            variant: 'error',
            preventDuplicate: false,
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const userLogin = (data, history, keepLogged, enqueueSnackbar, closeSnackbar) => async (dispatch) => {
  const response = await fetch(`${REACT_APP_URL_API}/auth/local/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (response.status === 401) {
    enqueueSnackbar(`El usuario o contraseña son inválidos`, {
      variant: 'error',
      preventDuplicate: false,
      action: (key) => (
        <button className="notistackButton" onClick={() => closeSnackbar(key)}>
          X
        </button>
      ),
    });
  } else if (response.status === 400) {
    enqueueSnackbar(`El usuario no existe, regístrese`, {
      variant: 'error',
      preventDuplicate: false,
      action: (key) => (
        <button className="notistackButton" onClick={() => closeSnackbar(key)}>
          X
        </button>
      ),
    });
  } else if (response.status === 200) {
    if (keepLogged) {
      localStorage.setItem('userData', JSON.stringify(result.user));
      localStorage.setItem('access_token', JSON.stringify(result.access_token));
      localStorage.setItem('logged', true);
    } else {
      sessionStorage.setItem('userData', JSON.stringify(result.user));
      sessionStorage.setItem('access_token', JSON.stringify(result.access_token));
      sessionStorage.setItem('logged', true);
    }
    dispatch({
      type: 'LOGIN_USER',
      payload: result.user,
    });
    enqueueSnackbar(`Bienvenido, ${result.user.firstName}`, {
      variant: 'success',
      preventDuplicate: true,
      action: (key) => (
        <button className="notistackButton" onClick={() => closeSnackbar(key)}>
          X
        </button>
      ),
    });
    history.push('/admin/dashboard');
  } else {
    Swal.fire('Something went wrong :(', '', 'error');
    enqueueSnackbar(`Something went wrong :(`, {
      variant: 'error',
      preventDuplicate: false,
      action: (key) => (
        <button className="notistackButton" onClick={() => closeSnackbar(key)}>
          X
        </button>
      ),
    });
  }
};

export const addUser = (user, history, enqueueSnackbar, closeSnackbar) => async (dispatch) => {
  try {
    const res = await fetch(`${REACT_APP_URL_API}/auth/local/signup`, {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const result = await res.json();

    if (res.status === 400) {
      Swal.fire('User already exist', '', 'error');
    } else if (res.status === 201) {
      localStorage.setItem('userData', JSON.stringify(result));
      dispatch({
        type: 'CREATE_USER',
        payload: result,
      });
      enqueueSnackbar('Te has registrado con exito', {
        variant: 'success',
        action: (key) => (
          <button className="notistackButton" onClick={() => closeSnackbar(key)}>
            X
          </button>
        ),
      });
      history.push('/admin/dashboard');
    }
  } catch (err) {
    console.log(err);
  }
};

export const resetPassword = (userId, token) => async (dispatch) => {
  await fetch(`${REACT_APP_URL_API}/user/${userId}/passwordReset`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  })
    .then((res) => res.json())
    .then((data) =>
      dispatch({
        type: 'RESET_PASSWORD',
        payload: data,
      }),
    );
};

export const userLogout = (history) => async (dispatch) => {
  try {
    localStorage.clear();
    sessionStorage.clear();
    dispatch({
      type: 'USER_LOGOUT',
    });
    history.push('/login');
  } catch (err) {
    console.log(err);
  }
};

export const getUser = (userId, token) => async (dispatch) => {
  const res = await fetch(`${REACT_APP_URL_API}/user/${userId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (res.status === 404) {
    dispatch({
      type: 'USER_LOGOUT',
    });
    localStorage.clear();
  } else if (res.status === 200) {
    dispatch({
      type: 'SET_USER',
      payload: result.user,
    });
  }
};

export const loggedUser = (userId, token) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/user/${userId}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });
  } catch (err) {}
};
