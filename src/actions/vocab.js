import axios from 'axios';
import {
	LOGGED_IN_USER,
	GET_USER_LANGUAGE_WORDS,
	SET_USER_LANGUAGE,
	GET_ALL_LANGUAGE_OPTIONS,
	ADD_WORD,
	EDIT_WORD,
	DELETE_WORD,
	ADD_COMPONENT,
	EDIT_COMPONENT,
	DELETE_COMPONENT,
	SET_TEXT_INPUT,
	SET_LAST_LOGIN,
	GET_USER_INFO
} from './types';

import { setAlerts } from './auth';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/vocab';

// function getTextInput() {
// 	return localStorage.getItem('text_input') || null;
// }

function getAccessToken() {
	return localStorage.getItem('access_token') || null;
}

// GET_USER_INFO
export function getUserInfo() {
	// console.log('getUserInfo() ran!');
	return async function(dispatch) {
		const access_token = getAccessToken();
		if (access_token) {
			try {
				const headers = {
					Authorization : 'Bearer ' + access_token
				};
				const res = await axios.get(`${API_URL}/start`, { headers: headers });

				let {
					current_text,
					first_login,
					is_email_confirmed,
					languages,
					last_login,
					last_source_code,
					name,
					user,
					words_array
				} = res.data;

				const languageObject = {};
				languages.forEach(option => {
					languageObject[option[0]] = option[1];
				});

				// dispatch(setLanguageOptions(data.languages));
				// dispatch(setUserLanguage(data.last_source_code));
				// dispatch(storeUserLanguageWords(data.words_array, data.last_source_code));
				// dispatch(loggedInUserInfo(data.user));
				// dispatch(setTextInputInState(data.current_text));
				// dispatch(storeLastLogininState(data.last_login));

				dispatch({
					type               : GET_USER_INFO,
					first_login,
					is_email_confirmed,
					language           : last_source_code,
					languages          : languages,
					language_object    : languageObject,
					last_login,
					name,
					text_input         : current_text,
					user,
					words_array
				});

				const alerts = [];
				if (first_login) {
					alerts.push({
						type  : 'success',
						title : `Welcome to VocabuCards, ${name}!`,
						text  : 'You have successfully registered for an account.  Time to get studying...'
					});
				}
				if (!is_email_confirmed) {
					alerts.push({
						type  : 'info',
						title : 'Confirm Email Address',
						text  : `Please confirm your email address so that it can be used to reset your password... you should already have an email from us in your ${user} inbox.`
					});
				}

				dispatch(setAlerts(alerts));
			} catch (e) {
				console.log(e);
			}
		}
	};
}

// function loggedInUserInfo(email) {
// 	return {
// 		type : LOGGED_IN_USER,
// 		user : email
// 	};
// }

// function storeLastLogininState(last_login) {
// 	return {
// 		type       : SET_LAST_LOGIN,
// 		last_login
// 	};
// }

// GET_USER_LANGUAGE_WORDS
export function getUserLanguageWordsViaAPI(source_code = 'sv') {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + getAccessToken()
			};
			const res = await axios.get(`${API_URL}/words/${source_code}`, { headers: headers });
			const words_array = res.data;

			// return dispatch(storeUserLanguageWords(words_array, source_code));
			return dispatch(storeUserLanguageWords(words_array));
		} catch (e) {
			console.log(e);
		}
	};
}
// function storeUserLanguageWords(words_array, source_code) {
function storeUserLanguageWords(words_array) {
	return {
		type        : GET_USER_LANGUAGE_WORDS,
		// words : { words_array, source_code }
		words_array
	};
}

// User Language Settings
export function updateUserLastLanguageViaAPI(source_code) {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + getAccessToken()
			};
			const res = await axios.get(`${API_URL}/last/${source_code}`, { headers: headers });
			let last_source_code = res.data;
			dispatch(setTextInputInState(null));
			return dispatch(setUserLanguage(last_source_code));
		} catch (e) {
			console.log(e);
		}
	};
}
// export function getUserLastLanguageViaAPI() {
// 	return async function(dispatch) {
// 		try {
// 			const headers = {
// 				Authorization : 'Bearer ' + getAccessToken()
// 			};
// 			const res = await axios.get(`${API_URL}/last`, { headers: headers });
// 			const last_source_code = res.data;

// 			return dispatch(setUserLanguage(last_source_code));
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	};
// }

// SET_USER_LANGUAGE
export function setUserLanguage(source_code) {
	return {
		type     : SET_USER_LANGUAGE,
		language : source_code
	};
}

// SET_TEXT_INPUT
export function setTextInput(textInput) {
	return function(dispatch) {
		dispatch(setTextInputInState(textInput));
	};
}

function setTextInputInState(textInput) {
	return {
		type      : SET_TEXT_INPUT,
		textInput
	};
}

// GET_ALL_LANGUAGE_OPTIONS
export function getAllLanguageOptionsViaAPI() {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + getAccessToken()
			};
			const res = await axios.get(`${API_URL}/languages`, { headers: headers });
			const languages = res.data;

			return dispatch(setLanguageOptions(languages));
		} catch (e) {
			console.log(e);
		}
	};
}

function setLanguageOptions(languages) {
	const languageObject = {};
	languages.forEach(option => {
		languageObject[option[0]] = option[1];
	});

	return {
		type            : GET_ALL_LANGUAGE_OPTIONS,
		languages,
		language_object : languageObject
	};
}

// ADD_WORD
export function addWordToState(wordObject) {
	return function(dispatch) {
		dispatch({
			type : ADD_WORD,
			word : wordObject
		});
	};
}

// EDIT_WORD
export function editWordInState(wordObject) {
	return function(dispatch) {
		dispatch({
			type : EDIT_WORD,
			word : wordObject
		});
	};
}

// DELETE_WORD
export function deleteWordInState(root_id) {
	return function(dispatch) {
		dispatch({
			type    : DELETE_WORD,
			root_id
		});
	};
}

// ADD_COMPONENT
export function addComponentToState(componentObject) {
	return function(dispatch) {
		dispatch({
			type      : ADD_COMPONENT,
			component : componentObject
		});
	};
}

// EDIT_COMPONENT
export function editComponentInState(componentObject) {
	return function(dispatch) {
		dispatch({
			type      : EDIT_COMPONENT,
			component : componentObject
		});
	};
}

// DELETE_COMPONENT
export function deleteComponentInState(componentId, root_id) {
	return function(dispatch) {
		dispatch({
			type        : DELETE_COMPONENT,
			componentId,
			root_id
		});
	};
}
