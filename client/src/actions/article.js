import IP from '../IP.js'

export const createArticle = (data, token, enqueueSnackbar, closeSnackbar) => async dispatch => {
    try {
        await fetch(`http://${IP}:3001/article/createarticle`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
            .then(data => data.json())
            .then(res => {
                if (res.status === 400 && res.message === "Article already exists") {
                    enqueueSnackbar('El articulo ya existe', {
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
                        type: 'CREATE_ARTICLE',
                        payload: res.newCategory,
                    })
                    enqueueSnackbar('Articulo añadidp con exito', {
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

export const getArticles = (token) => async dispatch => {
    try {
        await fetch(`http://${IP}:3001/article`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
            .then(data => data.json())
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: 'GET_ARTICLES',
                        payload: res.articles
                    })
                }
            })
    } catch (err) {
        console.log(err)
    }
}

export const getArticlesBySupplierId = (token, id) => async dispatch => {
    try {
        await fetch(`http://${IP}:3001/article/supplier/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
            .then(data => data.json())
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: 'GET_ARTICLES',
                        payload: res.articles
                    })
                }
            })
    } catch (err) {
        console.log(err)
    }
}

export const getArticlesByCategoryId = (token, id) => async dispatch => {
    try {
        await fetch(`http://${IP}:3001/article/category/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'auth-token': token
            },
        })
            .then(data => data.json())
            .then(res => {
                if (res.status === 200) {
                    dispatch({
                        type: 'GET_ARTICLES',
                        payload: res.articles
                    })
                }
            })
    } catch (err) {
        console.log(err)
    }
}

export const clearArticleData = () => async dispatch => {
    try {
        dispatch({
            type: 'CLEAR_ARTICLES'
        })
    } catch (err) {
        console.log(err)
    }
}