export const enqueueSnackbar = (notification) => async dispatch => {
    const key = notification.options && notification.options.key;

    dispatch({
        type: 'ENQUEUE_SNACKBAR',
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        }
    })
};

export const closeSnackbar = (key) => async dispatch => ({
    type: 'CLOSE_SNACKBAR',
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = (key) => async dispatch => ({
    type: 'REMOVE_SNACKBAR',
    key,
});