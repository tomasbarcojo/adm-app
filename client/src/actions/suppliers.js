import '../App.css';
const { REACT_APP_URL_API } = process.env;

export const getSuppliers = (token) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/supplier`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        return dispatch({
          type: 'GET_SUPPLIERS',
          payload: res,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const getSuppliersByName = (token, name) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/supplier/byname`, {
      method: 'POST',
      body: JSON.stringify(name),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        return dispatch({
          type: 'GET_SUPPLIERS',
          payload: res,
        });
      });
  } catch (err) {
    console.log(err);
  }
};

export const addSupplier = (data, token, enqueueSnackbar, closeSnackbar) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/supplier/createSupplier`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 400 && res.message === 'Supplier already exists') {
          enqueueSnackbar('El proveedor ya existe', {
            variant: 'error',
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        } else if (res.status === 400 && res.message === 'Necesary data required') {
          enqueueSnackbar('Ha ocurrido un error', {
            variant: 'error',
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        } else if (res.status === 201) {
          dispatch({
            type: 'CREATE_SUPPLIER',
            payload: res.newSupplier,
          });
          enqueueSnackbar('Proveedor añadido con exito', {
            variant: 'success',
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
  await fetch(`${REACT_APP_URL_API}/user/logout`, {
    credentials: 'include',
  }).then(() => {
    localStorage.clear();
    dispatch({
      type: 'USER_LOGOUT',
    });
    history.push('/');
  });
};

export const getUser = (userId, token) => async (dispatch) => {
  await fetch(`${REACT_APP_URL_API}/user/${userId}`, {
    // credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'auth-token': token,
    },
  })
    .then((res) => res.json())
    .then((user) => {
      dispatch({
        type: 'SET_USER',
        payload: user,
      });
    });
};
