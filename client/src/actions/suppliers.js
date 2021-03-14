import Swal from 'sweetalert2';
import '../App.css'

export const getSuppliers = (token) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/supplier`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
        .then(data => data.json())
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: 'GET_SUPPLIERS',
                    payload: res.suppliers
                })
            } else {
                alert('server error')
            }
        })
    } catch (err) {
        console.log(err)
    }
}

export const addSupplier = (data, token, enqueueSnackbar, closeSnackbar) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/supplier/createSupplier`, {
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

export const resetPassword = (userId, token) => async dispatch => {
    await fetch(`http://localhost:3001/user/${userId}/passwordReset`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            "auth-token": token
        },
    })
        .then((res) => res.json())
        .then((data) =>
            dispatch({
                type: 'RESET_PASSWORD',
                payload: data,
            })
        )
}

export const userLogout = (history) => async dispatch => {
    await fetch(`http://localhost:3001/user/logout`, {
        credentials: 'include',
    }).then(() => {
        localStorage.clear()
        dispatch({
            type: 'USER_LOGOUT',
        })
        history.push('/')
    }
    )
}

export const getUser = (userId, token) => async dispatch => {
    await fetch(`http://localhost:3001/user/${userId}`, {
        // credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            "auth-token": token
        },
    })
        .then((res) => res.json())
        .then((user) => {
            dispatch({
                type: 'SET_USER',
                payload: user,
            })
        }
        )
}