import { LOGIN_USER, LOGOUT_USER } from '../actions/types';

const INITIAL_STATE = {
	user         : null,
	access_token : null
};

export default function rootReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				user         : action.user,
				access_token : action.access_token
			};

		case LOGOUT_USER:
			return {
				...state,
				user         : null,
				access_token : null
			};

		default:
			return state;
	}
}
