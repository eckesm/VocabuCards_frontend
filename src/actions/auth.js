import { v4 as uuid } from 'uuid';
import { LOGOUT_USER, ADD_ALERT, CLEAR_ALERTS, SET_ALERTS, REMOVE_ALERT, GET_STRIPE_CUSTOMER_ID } from './types';
import { customAxios } from '../helpers/tokens';

import { getUserInfo } from './vocab';
import { API_URL, getAccessToken } from '../helpers/API';

// REGISTER_USER
export function registerUserViaAPI(name, email_address, password, password_check, source_code) {
	return async function(dispatch) {
		try {
			const res = await customAxios.post(`${API_URL}/register`, {
				name,
				email_address,
				password,
				password_check,
				source_code
			});

			if (res.data.status === 'success') {
				localStorage.setItem('access_token', res.data.access_token);
				localStorage.setItem('refresh_token', res.data.refresh_token);
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
			const res = await customAxios.post(`${API_URL}/login`, { email_address, password });

			if (res.data.status === 'success') {
				localStorage.setItem('access_token', res.data.access_token);
				localStorage.setItem('refresh_token', res.data.refresh_token);
				// localStorage.setItem('access_token_exp', res.data.access_token_exp);
				// localStorage.setItem('refresh_token_exp', res.data.refresh_token_exp);
				localStorage.removeItem('rss_object');
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

export function addAlert(alertObj) {
	const newAlertObj = { ...alertObj, id: uuid() };
	return {
		type  : ADD_ALERT,
		alert : newAlertObj
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

export function removeAlert(alertId) {
	return {
		type    : REMOVE_ALERT,
		alertId
	};
}

// GET_STRIPE_CUSTOMER_ID
export function getStripeCustomerIdViaAPI() {
	return async function() {
		try {
			const headers = {
				Authorization : 'Bearer ' + getAccessToken()
			};
			const res = await customAxios.get(`${API_URL}/stripe-customer-id`, {
				headers : headers
			});
			return async function(dispatch) {
				dispatch({
					type               : GET_STRIPE_CUSTOMER_ID,
					stripe_customer_id : res.data.stripe_customer_id
				});
			};
		} catch (e) {
			console.log(e);
		}
	};
}

// LOGOUT_USER
export function logoutUserViaAPI() {
	return async function() {
		try {
			const headers = {
				Authorization : 'Bearer ' + getAccessToken()
			};
			const res = await customAxios.get(`${API_URL}/logout`, {
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
	localStorage.removeItem('refresh_token');
	// localStorage.removeItem('access_token_exp');
	// localStorage.removeItem('refresh_token_exp');
	localStorage.removeItem('rss_object');
	localStorage.removeItem('clicked_words_array');
	return async function(dispatch) {
		dispatch({
			type : LOGOUT_USER
		});
	};
}
