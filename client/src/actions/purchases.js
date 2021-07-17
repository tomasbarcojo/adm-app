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

export const updateTotal = (total) => async dispatch => {
  try {
    dispatch({
      type: 'UPDATE_TOTAL_PURCHASE',
      payload: total
    })
  }
  catch (err) {
    console.log(err)
  }
}