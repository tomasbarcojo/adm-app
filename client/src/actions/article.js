const { REACT_APP_URL_API } = process.env;

export const createArticle = (data, token, enqueueSnackbar, closeSnackbar) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/product`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 400 && res.message === 'Article already exists') {
          enqueueSnackbar('El articulo ya existe', {
            variant: 'error',
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        } else if (res.status === 400 && res.message === 'Necesary data required') {
          enqueueSnackbar('Ha ocurrido un error (data required)', {
            variant: 'error',
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        } else if (res.status === 201) {
          dispatch({
            type: 'CREATE_ARTICLE',
            payload: res.newCategory,
          });
          enqueueSnackbar('Articulo añadido con exito', {
            variant: 'success',
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const getArticles = (token, page, limit) => async (dispatch) => {
  const res = await fetch(`${REACT_APP_URL_API}/product?skip=${page}&limit=30`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await res.json();

  if (res.status === 200) {
    dispatch({
      type: 'GET_ARTICLES',
      payload: result,
    });
  }
};

export const getArticlesBySupplierId = (token, id) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/article/supplier/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: 'GET_ARTICLES',
            payload: res.articles,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const getArticlesByCategoryId = (token, id) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/article/category/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: 'GET_ARTICLES',
            payload: res.articles,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};

export const clearArticleData = () => async (dispatch) => {
  try {
    dispatch({
      type: 'CLEAR_ARTICLES',
    });
  } catch (err) {
    console.log(err);
  }
};
