import IP from '../IP.js'

export const getClients = (token) => async dispatch => {
  try {
    await fetch(`http://${IP}:3001/client`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
    })
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: 'GET_CLIENTS',
            payload: res.clients
          })
        }
      })
  } catch (err) {
    console.log(err)
  }
}

export const addClient = (data, token, enqueueSnackbar, closeSnackbar) => async dispatch => {
  try {
    await fetch(`http://${IP}:3001/client/createclient`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
    })
      .then(data => data.json())
      .then(res => {
        if (res.status === 201) {
          dispatch({
            type: 'CREATE_CLIENT',
            payload: res.newClient
          })
          enqueueSnackbar('Cliente creado con exito', {
            variant: 'success',
            action: key => (
              <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
            ),
          });
        } else if (res.status === 400) {
          enqueueSnackbar('El cliente ya existe', {
            variant: 'error',
            action: key => (
              <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
            ),
          });
        } else {
          enqueueSnackbar('Ocurrio un error', {
            variant: 'error',
            action: key => (
              <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
            ),
          });
        }
      })
  } catch (err) {
    console.log(err)
  }
}