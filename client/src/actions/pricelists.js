export const getPriceList = (token) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/pricelists`, {
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
                        payload: res.clients
                    })
                } else {
                    console.error('No suppliers')
                }
            })
    } catch (err) {
        console.log(err)
    }
}

export const addPriceList = (data, token, enqueueSnackbar, closeSnackbar) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/pricelists/addPriceLists`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
            .then(data => data.json())
            .then(res => {
                if (res.status === 400 && res.message === "Supplier already exists") {
                    enqueueSnackbar('El proveedor ya existe', {
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
                        type: 'ADD_SUPPLIER',
                        payload: res.newSupplier,
                    })
                    enqueueSnackbar('Proveedor añadido con exito', {
                        variant: 'success',
                        action: key => (
                            <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
                        ),
                    });
                }
            })
        // .catch((error) => { console.log(error) })
    } catch (err) {
        console.log(err)
    }
}