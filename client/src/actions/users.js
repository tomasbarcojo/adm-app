import Swal from 'sweetalert2';

export const userLogin = (data, history) => async dispatch => {
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
                Swal.fire("Email or password are invalid", "", "error")
            }
            else if (response.status === 400) {
                Swal.fire("Non-existent account, please sign in", "", "info")
            }
            else if (response.status === 200) {
                localStorage.setItem('userData', JSON.stringify(response.user))
                localStorage.setItem('token', JSON.stringify(response.token))
                dispatch({
                    type: 'LOGIN_USER',
                    payload: response.user,
                })
                // Swal.fire("You are logged in!", "", "success")
                history.push('/dashboard')
            }
            else {
                Swal.fire("Something went wrong :(", "", "error")
            }
        })
        .catch((error) => {
            return { error: true, message: 'Error en login, intente otra vez' }
        })
}

export const addUser = (user, history) => async dispatch => {
	try {
		await fetch('http://localhost:3001/user/createuser', {
			method: 'POST',
			body: JSON.stringify(user),
			headers: {
                'Content-Type': 'application/json',
                // "auth-token": token
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
                    Swal.fire("User created", "", "success")
                    history.push('/')
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
    await fetch('http://localhost:3001/user/logout', {
        credentials: 'include',
    }).then(() =>{
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
    .then((user) =>{
        dispatch({
            type: 'SET_USER',
            payload: user,
        })
    }	
    )
}