const initialstate = {
	user: {},
    classes: [],
	userLogged: false,
	onClass: false
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
				classes: [],
				userLogged: false,
			}
			
			// CLASSES

		case 'GET_CLASSES':
			return {
				...state,
				classes: action.payload,
			}

		case 'ADD_CLASS':
			return {
				...state,
				classes: [...state.classes, action.payload]
			}

		case 'START_CLASS':
			return {
				...state,
				onClass: true
			}

		case 'REMOVE_CLASS':
			return {
				...state,
				classes: state.classes.filter(
					(classFilter) => classFilter.id !== action.payload
				),
			}
			
		default:
			return state
	}
}