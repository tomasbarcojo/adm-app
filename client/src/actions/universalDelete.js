import IP from '../IP.js'

export const universalDelete = (path, id, token, enqueueSnackbar, closeSnackbar) => async dispatch => {
    try {
      await fetch(`http://${IP}:3001/${path}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': token
        },
      })
        .then(data => data.json())
        .then(res => {
          if (res.status === 200) {
            dispatch({
                type: 'DELETE_PRICELIST',
                payload: res.pricelist,
              })
            enqueueSnackbar('Eliminado exitosamente', {
              variant: 'success',
              action: key => (
                <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
              ),
            });
          } else if (res.status === 404) {
            enqueueSnackbar('El sistema intento borrar con un ID no valido. (Esto no deberia pasar)', {
              variant: 'error',
              action: key => (
                <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
              ),
            });
          } else if (res.status === 500) {
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