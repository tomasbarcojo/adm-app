import IP from '../IP.js'

export const getPriceList = (token) => async dispatch => {
  try {
    await fetch(`http://${IP}:3001/pricelist`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
    })
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: 'GET_PRICELISTS',
            payload: res.pricelist
          })
        }
      })
  } catch (err) {
    console.log(err)
  }
}

export const getPriceListsById = (token, id) => async dispatch => {
  try {
    fetch(`http://${IP}:3001/pricelist/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    })
      .then(data => data.json())
      .then(res => {
        if (res.status === 200) {
          dispatch({
            type: 'GET_PRICELISTS_BY_ID',
            payload: res.pricelist
          })
        }
      })
  } catch (err) {
    console.log(err)
  }
}

export const clearData = () => async dispatch => {
  try {
    dispatch({
      type: 'CLEAR_DATA'
    })
  } catch (err) {
    console.log(err)
  }
}

export const addPriceList = (data, token, enqueueSnackbar, closeSnackbar) => async dispatch => {
  try {
    await fetch(`http://${IP}:3001/pricelist/createpricelist`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      },
    })
      .then(data => data.json())
      .then(res => {
        if (res.status === 400 && res.message === "Price list already exists") {
          enqueueSnackbar('El listado ya existe', {
            variant: 'warning',
            action: key => (
              <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
            ),
          });
        } else if (res.status === 400 && res.message === "Necesary data required") {
          enqueueSnackbar('Ha ocurrido un error', {
            variant: 'error',
            action: key => (
              <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
            ),
          });
        } else if (res.status === 201) {
          dispatch({
            type: 'CREATE_PRICELIST',
            payload: res.result,
          })
          enqueueSnackbar('Listado añadido con exito', {
            variant: 'success',
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

export const editPriceList = (id, data, token, enqueueSnackbar, closeSnackbar) => async dispatch => {
  try {
    await fetch(`http://${IP}:3001/pricelist/editpricelist/${id}`, {
      method: 'POST',
      body: JSON.stringify({data: data}),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token
      }
    })
    .then(data => data.json())
    .then(res => {
      if (res.status === 204) {
        enqueueSnackbar('Listado editado con exito', {
          variant: 'success',
          action: key => (
            <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
          ),
        });
      } else if (res.status === 400) {
        enqueueSnackbar('No se ha realizado ningun cambio', {
          variant: 'warning',
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