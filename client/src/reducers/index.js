const initialstate = {
	user: {},
	suppliers: {},
	clients: {},
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
			};

		case 'SET_USER':
			return {
				...state,
				user: action.payload,
				userLogged: true
			};

		case 'ADD_USER':
			return {
				...state,
				user: action.payload
			};

		case 'RESET_PASSWORD':
			return {
				...state,
				user: action.payload,
			};

		case 'USER_LOGOUT':
			return {
				...state,
				user: {},
				userLogged: false,
			};

		// SUPPLIERS

		case 'ADD_SUPPLIER':
			return {
				...state,
				suppliers: [...state.suppliers, action.payload]
			};

		case 'GET_SUPPLIERS':
			return {
				...state,
				suppliers: action.payload
			};
		
		// NOTISTACK

		default:
			return state
	}
}