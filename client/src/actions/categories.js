import IP from '../IP.js'

export const createCategory = (data, token, enqueueSnackbar, closeSnackbar) => async dispatch => {
    try {
        await fetch(`http://${IP}:3001/category/createcategory`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
        .then(data => data.json())
        .then(res => {
            if (res.status === 400 && res.message === "Category already exists") {
                enqueueSnackbar('La categoria ya existe', {
                    variant: 'error',
                    action: key => (
                        <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
                    ),
                });
            } else if (res.status === 400 && res.message === "Necesary data required") {
                enqueueSnackbar('Ha ocurrido un error (data required)', {
                    variant: 'error',
                    action: key => (
                        <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
                    ),
                });
            } else if (res.status === 201) {
                    dispatch({
                        type: 'CREATE_CATEGORY',
                        payload: res.newCategory,
                    })
                    enqueueSnackbar('Categoria añadida con exito', {
                        variant: 'success',
                        action: key => (
                            <button className='notistackButton' onClick={() => closeSnackbar(key)}>X</button>
                        ),
                    });
                }
        })
    } catch (err) {
        console.log(err);
    }
}