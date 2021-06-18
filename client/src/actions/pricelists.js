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
                // else {
                //     console.error('No price lists')
                // }
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
                        variant: 'error',
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