import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER } from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';

// LOGIN_USER
export function loginUserViaAPI(email, password) {
	return async function(dispatch) {
		try {
			const res = await axios.post(`${API_URL}/login`, { email, password });

			if (res.data.status === 'success') {
				const access_token = res.data.access_token;
				localStorage.setItem('access_token', access_token);
				return dispatch(loggedInUser(email, access_token));
			}
		} catch (e) {
			console.log(e);
		}
	};
}
function loggedInUser(email, access_token) {
	return {
		type         : LOGIN_USER,
		user         : email,
		access_token
	};
}

// LOGOUT_USER
export function logoutUser() {
	localStorage.removeItem('access_token');
	return {
		type : LOGOUT_USER
	};
}
