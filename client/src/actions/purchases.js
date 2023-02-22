import { useSnackbar } from 'notistack';
const { REACT_APP_URL_API } = process.env;

export const addDataPurchase = (data) => async (dispatch) => {
  try {
    data.productList = data.productList?.filter((v, i, a) => a.findIndex((t) => t.productId === v.productId) === i);
    dispatch({
      type: 'ADD_DATA_PURCHASE',
      payload: data,
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
    const res = await fetch(`${REACT_APP_URL_API}/purchase`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });

    if (res.status === 400) {
      enqueueSnackbar('Ha ocurrido un error', {
        variant: 'error',
        action: (key) => (
          <button className="notistackButton" onClick={() => closeSnackbar(key)}>
            X
          </button>
        ),
      });
    } else if (res.status === 201) {
      enqueueSnackbar('Compra realizada con exito', {
        variant: 'success',
        action: (key) => (
          <button className="notistackButton" onClick={() => closeSnackbar(key)}>
            X
          </button>
        ),
      });
    }
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
    });

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

export const updatePurchaseStatus = (token, data, purchaseId, enqueueSnackbar, closeSnackbar) => async (dispatch) => {
  try {
    const res = await fetch(`${REACT_APP_URL_API}/purchase/status/${purchaseId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'auth-token': token,
      },
    });

    if (res.status === 400) {
      enqueueSnackbar('Ha ocurrido un error', {
        variant: 'error',
        action: (key) => (
          <button className="notistackButton" onClick={() => closeSnackbar(key)}>
            X
          </button>
        ),
      });
    } else if (res.status === 200) {
      enqueueSnackbar('El estado de la compra fue modificado con exito', {
        variant: 'success',
        action: (key) => (
          <button className="notistackButton" onClick={() => closeSnackbar(key)}>
            X
          </button>
        ),
      });
    }
  } catch (err) {
    console.log(err);
  }
};
