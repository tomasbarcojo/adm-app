const initialstate = {
	user: [],
	suppliers: [],
	clients: [],
	pricelists: [],
	pricelistsbyid: [],
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
				user: [],
				suppliers: [],
				clients: [],
				pricelists: [],
				pricelistsbyid: [],
				categories: [],
				articles: [],
				userLogged: false,
				notifications: []
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

		// CLIENTS

		case 'GET_CLIENTS':
			return {
				...state,
				clients: action.payload
			};

		case 'CREATE_CLIENT':
			return {
				...state,
				clients: [...state.clients, action.payload]
			};

		// PRICE LIST

		case 'GET_PRICELISTS':
			return {
				...state,
				pricelists: action.payload
			};

		case 'GET_PRICELISTS_BY_ID':
			return {
				...state,
				pricelistsbyid: action.payload
			};

		case 'CREATE_PRICELIST': {
			return {
				...state,
				pricelists: [...state.pricelists, action.payload]
			};
		};

		case 'CLEAR_DATA':
			return {
				...state,
				pricelistsbyid: []
			};

		case 'DELETE_PRICELIST':
			return {
				...state,
				pricelists: state.pricelists.filter(
					(pricelist) => pricelist.id !== action.payload.id
				),
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