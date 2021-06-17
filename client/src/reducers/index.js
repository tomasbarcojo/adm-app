const initialstate = {
	user: [],
	suppliers: [],
	clients: [],
	pricelists: [],
	categories: [],
	articles: [],
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

		case 'CREATE_USER':
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

		// SUPPLIER

		case 'GET_SUPPLIERS':
			return {
				...state,
				suppliers: action.payload
			};

		case 'CREATE_SUPPLIER':
			return {
				...state,
				suppliers: [...state.suppliers, action.payload]
			};

		// PRICE LIST

		case 'GET_PRICELISTS':
			return {
				...state,
				pricelists: action.payload
			};

		case 'CREATE_PRICELIST': {
			var newArr = state.pricelists
			for (const el of action.payload) {
				newArr.push(el)
			}
			return {
				...state,
				pricelists: newArr
			};
		}

		// CATEGORY

		case 'GET_CATEGORIES':
			return {
				...state,
				categories: action.payload
			};

		case 'CREATE_CATEGORY':
			return {
				...state,
				categories: [...state.categories, action.payload]
			};

		// ARTICLE

		case 'GET_ARTICLES':
			return {
				...state,
				articles: action.payload
			};

		case 'CREATE_ARTICLE':
			return {
				...state,
				articles: [...state.articles, action.payload]
			};

		default:
			return state
	}
}