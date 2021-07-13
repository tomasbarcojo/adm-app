export const addDataPurchase = (data) => async dispatch => {
  try {
    dispatch({
      type: 'ADD_DATA_PURCHASE',
      payload: data
    })
  }
  catch (err) {
    console.log(err)
  }
}