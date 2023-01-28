const { REACT_APP_URL_API } = process.env;

export const addDataPurchase = (data) => async (dispatch) => {
  try {
    dispatch({
      type: 'ADD_DATA_PURCHASE',
      payload: data.filter((el) => el.quantity > 0 && el.price > 0),
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTotal = (total) => async (dispatch) => {
  try {
    dispatch({
      type: 'UPDATE_TOTAL_PURCHASE',
      payload: total,
    });
  } catch (err) {
    console.log(err);
  }
};

export const newPurchase = (data, token, enqueueSnackbar, closeSnackbar) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/purchase/createpurchase`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 400 && res.message === 'Price list already exists') {
          enqueueSnackbar('El listado ya existe', {
            variant: 'warning',
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        } else if (res.status === 400 && res.message === 'Necesary data required') {
          enqueueSnackbar('Ha ocurrido un error', {
            variant: 'error',
            action: (key) => (
              <button className="notistackButton" onClick={() => closeSnackbar(key)}>
                X
              </button>
            ),
          });
        } else if (res.status === 201) {
          dispatch({
            type: 'CREATE_PRICELIST',
            payload: res.result,
          });
          enqueueSnackbar('Listado añadido con exito', {
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

export const getPurchases = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${REACT_APP_URL_API}/purchase`, {
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    })

    const result = await res.json();

    if (res.status === 200) {
      dispatch({
        type: 'GET_PURCHASES',
        payload: result,
      });
    }
  } catch (err) {
    console.log(err);
  }
};
