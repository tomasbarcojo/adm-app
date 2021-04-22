export const getClients = (token) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/clients`, {
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
            // else {
            //     console.error('No clients')
            // }
        })
    } catch (err) {
        console.log(err)
    }
}

export const addClient = (token) => async dispatch => {
    try {
        await fetch(`http://localhost:3001/clients`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
        .then(data => data.json())
        .then(res => {
            if (res.status === 200) {
                dispatch({
                    type: 'ADD_CLIENT',
                    payload: res.client
                })
            } 
            // else {
            //     console.error('No suppliers')
            // }
        })
    } catch (err) {
        console.log(err)
    }
}