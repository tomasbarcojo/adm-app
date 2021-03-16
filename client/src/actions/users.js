import Swal from 'sweetalert2';
import '../App.css'

export const userLogin = (data, history, enqueueSnackbar, closeSnackbar) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/user/login`, {
            method: 'POST',
            // credentials: 'include',
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
                        action: key => (
                            <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
                        ),
                    });
                }
                else if (response.status === 400) {
                    enqueueSnackbar(`El usuario no existe, regístrese`, {
                        variant: 'error',
                        preventDuplicate: false,
                        action: key => (
                            <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
                        ),
                    });
                }
                else if (response.status === 200) {
                    localStorage.setItem('userData', JSON.stringify(response.user))
                    localStorage.setItem('token', JSON.stringify(response.token))
                    localStorage.setItem('logged', true)
                    dispatch({
                        type: 'LOGIN_USER',
                        payload: response.user,
                    })
                    enqueueSnackbar(`Bienvenido, ${response.user.firstName}`, {
                        variant: 'success',
                        preventDuplicate: true,
                        action: key => (
                            <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
                        ),
                    });
                    history.push('/admin/dashboard')
                }
                else {
                    Swal.fire("Something went wrong :(", "", "error")
                }
            })
    } catch (err) {
        console.log(err)
    }
}

export const addUser = (user, history, enqueueSnackbar, closeSnackbar) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/user/createuser`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(data => data.json())
            .then(res => {
                if (res.status === 400) {
                    Swal.fire("User already exist", "", "error")
                } else if (res.status === 201) {
                    localStorage.setItem('userData', JSON.stringify(res.newUser))
                    dispatch({
                        type: 'ADD_USER',
                        payload: res.newUser,
                    })
                    enqueueSnackbar('Te has registrado con exito', {
                        variant: 'success',
                        action: key => (
                            <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
                        ),
                    });
                    history.push('/admin/dashboard')
                }
            })
            .catch((error) => { console.log(error) })
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
    try {
        localStorage.clear();
        dispatch({
            type: 'USER_LOGOUT',
        });
        history.push('/login')
    } catch (err) {
        console.log(err)
    }
};

export const getUser = (userId, token) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/user/${userId}`, {
            // credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
        })
            .then((data) => data.json())
            .then(res => {
                if (res.status === 404) {
                    dispatch({
                        type: 'USER_LOGOUT'
                    });
                    localStorage.clear();
                } else if (res.status === 200) {
                    dispatch({
                        type: 'SET_USER',
                        payload: res.user,
                    })
                }
            })
    } catch (err) {
        console.log(err)
    }
}

export const loggedUser = (userId, token) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                "auth-token": token
            },
        })
    } catch (err) {
        
    }
};