import axios from 'axios';
import { LOGIN_USER, LOGOUT_USER, ADD_ALERT, CLEAR_ALERTS, SET_ALERTS } from './types';

import { getUserInfo } from './vocab';

import { API_URL } from '../helpers/API';

// const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/auth';
// const API_URL = process.env.REACT_APP_API_URL || 'https://vocabucards-backend.herokuapp.com/api/auth';
// const API_URL = process.env.REACT_APP_API_URL || 'http://api.vocabucards.com/auth';

// REGISTER_USER
export function registerUserViaAPI(name, email_address, password, password_check, source_code) {
	return async function(dispatch) {
		try {
			const res = await axios.post(`${API_URL}/auth/register`, {
				name,
				email_address,
				password,
				password_check,
				source_code
			});

			if (res.data.status === 'success') {
				const access_token = res.data.access_token;
				localStorage.setItem('access_token', access_token);
				dispatch(loggedInUser(email_address));
				dispatch(getUserInfo());
				return res.data;
			}
			else {
				return res.data;
			}
		} catch (e) {
			console.log(e);
		}
	};
}

// LOGIN_USER
export function loginUserViaAPI(email_address, password) {
	return async function(dispatch) {
		try {
			const res = await axios.post(`${API_URL}/auth/login`, { email_address, password });

			if (res.data.status === 'success') {
				dispatch(clearAlerts());
				const access_token = res.data.access_token;
				localStorage.setItem('access_token', access_token);
				dispatch(loggedInUser(email_address));
				dispatch(getUserInfo());
				return res.data;
			}
			else {
				return res.data;
			}
		} catch (e) {
			console.log(e);
		}
	};
}

function loggedInUser(email) {
	return {
		type : LOGIN_USER,
		user : email
	};
}

export function addAlert(alertObj) {
	return {
		type  : ADD_ALERT,
		alert : alertObj
	};
}

export function setAlerts(alertArray) {
	return {
		type   : SET_ALERTS,
		alerts : alertArray
	};
}

export function clearAlerts() {
	return {
		type : CLEAR_ALERTS
	};
}

// LOGOUT_USER
export function logoutUserViaAPI(access_token) {
	return async function() {
		try {
			const headers = {
				Authorization : 'Bearer ' + access_token
			};
			const res = await axios.get(`${API_URL}/auth/logout`, {
				headers : headers
			});

			if (res.data.status === 'success') {
				return res.data;
			}
			else {
				return res.data;
			}
		} catch (e) {
			console.log(e);
		}
	};
}

export function logoutUser() {
	localStorage.removeItem('access_token');
	return async function(dispatch) {
		dispatch({
			type : LOGOUT_USER
		});
	};
}
