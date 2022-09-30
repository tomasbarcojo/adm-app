const { REACT_APP_URL_API } = process.env;

export const createCategory =
  (data, token, enqueueSnackbar, closeSnackbar) => async (dispatch) => {
    try {
      await fetch(`${REACT_APP_URL_API}/category/createcategory`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      })
        .then((data) => data.json())
        .then((res) => {
          if (res.status === 400 && res.message === "Category already exists") {
            enqueueSnackbar("La categoria ya existe", {
              variant: "error",
              action: (key) => (
                <button
                  className="notistackButton"
                  onClick={() => closeSnackbar(key)}
                >
                  X
                </button>
              ),
            });
          } else if (
            res.status === 400 &&
            res.message === "Necesary data required"
          ) {
            enqueueSnackbar("Ha ocurrido un error (data required)", {
              variant: "error",
              action: (key) => (
                <button
                  className="notistackButton"
                  onClick={() => closeSnackbar(key)}
                >
                  X
                </button>
              ),
            });
          } else if (res.status === 201) {
            dispatch({
              type: "CREATE_CATEGORY",
              payload: res.newCategory,
            });
            enqueueSnackbar("Categoria añadida con exito", {
              variant: "success",
              action: (key) => (
                <button
                  className="notistackButton"
                  onClick={() => closeSnackbar(key)}
                >
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

export const getCategories = (token) => async (dispatch) => {
  try {
    await fetch(`${REACT_APP_URL_API}/category`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    })
      .then((data) => data.json())
      .then((res) => {
        if (res.status === 200) {
          dispatch({
            type: "GET_CATEGORIES",
            payload: res.categories,
          });
        }
      });
  } catch (err) {
    console.log(err);
  }
};
