const initialstate = {
	user: {},
	suppliers: {},
	userLogged: false,
	notifications: []
}

export default function rootReducer(state = initialstate, action) {
	switch (action.type) {
		// USER

		case 'LOGIN_USER':
			return {
				...state,
				user: action.payload,
				userLogged: true,
			}

		case 'SET_USER':
			return {
				...state,
				user: action.payload,
				userLogged: true
			}

		case 'ADD_USER':
			return {
				...state,
				user: action.payload
			}

		case 'RESET_PASSWORD':
			return {
				...state,
				user: action.payload,
			}

		case 'USER_LOGOUT':
			return {
				...state,
				user: {},
				userLogged: false,
			}

		// SUPPLIERS

		case 'ADD_SUPPLIER':
			return {
				...state,
				suppliers: action.payload
			}
		
		// NOTISTACK

		case 'ENQUEUE_SNACKBAR':
			return {
				...state,
				notifications: [
					...state.notifications,
					{
						key: action.key,
						...action.notification,
					},
				],
			};

		case 'CLOSE_SNACKBAR':
			return {
				...state,
				notifications: state.notifications.map(notification => (
					(action.dismissAll || notification.key === action.key)
						? { ...notification, dismissed: true }
						: { ...notification }
				)),
			};

		case 'REMOVE_SNACKBAR':
			return {
				...state,
				notifications: state.notifications.filter(
					notification => notification.key !== action.key,
				),
			};

		default:
			return state
	}
}