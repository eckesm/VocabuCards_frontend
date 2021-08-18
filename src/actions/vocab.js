import {
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
	GET_USER_INFO
} from './types';

import { addAlert } from './auth';
import { API_URL } from '../helpers/API';
import { customAxios } from '../helpers/tokens';
import {
	stripeCurrentAlert,
	stripeExpiringAlert,
	stripeTrialAlert,
	// stripeNoPaymentAlert,
	stripePastDueAlert
} from '../helpers/Stripe';

function getAccessToken() {
	return localStorage.getItem('access_token') || null;
}

// GET_USER_INFO
export function getUserInfo() {
	return async function(dispatch) {
		const access_token = getAccessToken();
		if (access_token) {
			try {
				const headers = {
					Authorization : 'Bearer ' + access_token
				};
				const res = await customAxios.get(`${API_URL}/start`, { headers: headers });

				let {
					account_override,
					current_plan,
					current_text,
					first_login,
					is_email_confirmed,
					languages,
					last_login,
					last_source_code,
					name,
					news_sources,
					stripe_cancel_at_period_end,
					stripe_canceled_at,
					stripe_customer_id,
					stripe_payment_method,
					stripe_period_end,
					stripe_period_start,
					subscription_status,
					trial_end,
					trial_start,
					user,
					words_array
				} = res.data;

				const languageObject = {};
				languages.forEach(option => {
					if (option[0] !== 'en') {
						languageObject[option[0]] = option[1];
					}
				});

				dispatch({
					type                        : GET_USER_INFO,
					account_override,
					current_plan,
					first_login,
					is_email_confirmed,
					language                    : last_source_code,
					languages                   : languages,
					language_object             : languageObject,
					last_login,
					name,
					news_sources                : news_sources || {},
					stripe_cancel_at_period_end,
					stripe_canceled_at,
					stripe_customer_id,
					stripe_payment_method,
					stripe_period_end,
					stripe_period_start,
					subscription_status,
					text_input                  : current_text || null,
					trial_end,
					trial_start,
					user,
					words_array                 : words_array || []
				});

				let closeMs = true;
				if (first_login) {
					dispatch(
						addAlert({
							type    : 'success',
							title   : `Welcome to VocabuCards, ${name}!`,
							text    : 'You have successfully registered for an account.  Time to get studying...',
							closeMs : false
						})
					);
					closeMs = false;
				}

				if (account_override !== 'full_access') {
					if (subscription_status === 'past_due') {
						dispatch(addAlert(stripePastDueAlert(current_plan, stripe_period_end, false)));
					}
					else if (subscription_status === 'trialing' && stripe_cancel_at_period_end === true) {
						dispatch(addAlert(stripeTrialAlert(current_plan, stripe_period_end, closeMs)));
					}
					else if (stripe_cancel_at_period_end === true) {
						dispatch(addAlert(stripeExpiringAlert(current_plan, stripe_period_end, false)));
					}
					// else if (!stripe_payment_method) {
					// 	dispatch(addAlert(stripeNoPaymentAlert(current_plan, stripe_period_end, false)));
					// }
					else {
						dispatch(addAlert(stripeCurrentAlert(current_plan, stripe_period_end, closeMs)));
					}
				}

				if (!is_email_confirmed) {
					dispatch(
						addAlert({
							type    : 'warning',
							title   : 'Confirm Email Address',
							text    : `Please confirm your email address... you should already have an email from us in your ${user} inbox.`,
							closeMs : closeMs
						})
					);
				}
			} catch (e) {
				console.log(e);
				return 'ERROR';
			}
		}
	};
}

// GET_USER_LANGUAGE_WORDS
export function getUserLanguageWordsViaAPI(source_code = 'sv') {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + getAccessToken()
			};
			const res = await customAxios.get(`${API_URL}/words/${source_code}`, { headers: headers });
			const words_array = res.data;

			return dispatch(storeUserLanguageWords(words_array));
		} catch (e) {
			console.log(e);
		}
	};
}
function storeUserLanguageWords(words_array) {
	return {
		type        : GET_USER_LANGUAGE_WORDS,
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
			const res = await customAxios.get(`${API_URL}/last/${source_code}`, { headers: headers });
			let last_source_code = res.data;
			dispatch(setTextInputInState(''));
			localStorage.removeItem('rss_object');
			return dispatch(setUserLanguage(last_source_code));
		} catch (e) {
			console.log(e);
		}
	};
}

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
			const res = await customAxios.get(`${API_URL}/languages`, { headers: headers });
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
