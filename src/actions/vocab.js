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
	GET_USER_INFO,
	SET_CURRENT_ARTICLE
} from './types';

import { addAlert } from './auth';
import { API_URL } from '../helpers/API';
import { customAxios } from '../helpers/tokens';
// import {
// 	stripeCurrentAlert,
// 	stripeExpiringAlert,
// 	stripeTrialAlert,
// 	stripePastDueAlert,
// 	stripeExpiredAlert,
// 	stripeRenewingSoonAlert
// } from '../helpers/Stripe';

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
					current_article,
					// current_plan,
					current_text,
					first_login,
					is_email_confirmed,
					languages,
					last_login,
					last_source_code,
					name,
					news_sources,
					// stripe_cancel_at_period_end,
					// stripe_canceled_at,
					// stripe_customer_id,
					// stripe_payment_method,
					// stripe_period_end,
					// stripe_period_start,
					// subscription_status,
					// trial_end,
					// trial_start,
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
					// current_plan,
					first_login,
					is_email_confirmed,
					language                    : last_source_code,
					languages                   : languages,
					language_object             : languageObject,
					last_login,
					name,
					news_sources                : news_sources || {},
					// stripe_cancel_at_period_end,
					// stripe_canceled_at,
					// stripe_customer_id,
					// stripe_payment_method,
					// stripe_period_end,
					// stripe_period_start,
					// subscription_status,
					current_article,
					text_input                  : current_text || null,
					// trial_end,
					// trial_start,
					user,
					words_array                 : words_array || []
				});

				localStorage.setItem('saved_language', res.data.last_source_code);

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

				// if (account_override !== 'full_access') {
				// 	if (subscription_status === 'past_due') {
				// 		dispatch(addAlert(stripePastDueAlert(current_plan, stripe_period_end, false)));
				// 	}
				// 	else if (subscription_status === 'canceled') {
				// 		dispatch(addAlert(stripeExpiredAlert(current_plan, stripe_period_end, false)));
				// 	}
				// 	else if (subscription_status === 'trialing' && stripe_cancel_at_period_end === true) {
				// 		dispatch(addAlert(stripeTrialAlert(current_plan, stripe_period_end, closeMs)));
				// 	}
				// 	else if (stripe_cancel_at_period_end === true) {
				// 		dispatch(addAlert(stripeExpiringAlert(current_plan, stripe_period_end, false)));
				// 	}
				// 	else {
				// 		const stripeEndDate = stripe_period_end * 1000;
				// 		const nowDate = Date.now();
				// 		const daysToRenewal = (stripeEndDate - nowDate) / 86400000;
				// 		if (daysToRenewal < 2 && current_plan === 'weekly') {
				// 			dispatch(addAlert(stripeRenewingSoonAlert(current_plan, stripe_period_end, false)));
				// 		}
				// 		else if (daysToRenewal < 4 && current_plan === 'monthly') {
				// 			dispatch(addAlert(stripeRenewingSoonAlert(current_plan, stripe_period_end, false)));
				// 		}
				// 		else if (daysToRenewal < 10 && current_plan === 'annually') {
				// 			dispatch(addAlert(stripeRenewingSoonAlert(current_plan, stripe_period_end, false)));
				// 		}
				// 	}
				// }

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
			dispatch(setUserLanguage(last_source_code));
			localStorage.removeItem('rss_object');
			return dispatch(setTextInput(''));
		} catch (e) {
			console.log(e);
		}
	};
}

// SET_USER_LANGUAGE
export function setUserLanguage(source_code) {
	localStorage.setItem('saved_language', source_code);
	return {
		type     : SET_USER_LANGUAGE,
		language : source_code
	};
}

// SET_TEXT_INPUT
export function setTextInput(textInput) {
	return {
		type      : SET_TEXT_INPUT,
		textInput
	};
	// };
}

// SET_CURRENT_ARTICLE
export function setCurrentArticle(articleId) {
	return {
		type      : SET_CURRENT_ARTICLE,
		articleId
	};
}

// GET_ALL_LANGUAGE_OPTIONS
export function getAllLanguageOptionsViaAPI() {
	return async function(dispatch) {
		try {
			// const headers = {
			// 	Authorization : 'Bearer ' + getAccessToken()
			// };
			// const res = await customAxios.get(`${API_URL}/languages`, { headers: headers });
			const res = await customAxios.get(`${API_URL}/languages`);
			const languagesNews = res.data;
			return dispatch(setLanguageOptions(languagesNews));
		} catch (e) {
			console.log(e);
		}
	};
}

function setLanguageOptions(languagesNews) {
	const languageObject = {};
	languagesNews.languages.forEach(option => {
		languageObject[option[0]] = option[1];
	});

	return {
		type            : GET_ALL_LANGUAGE_OPTIONS,
		languages       : languagesNews.languages,
		language_object : languageObject,
		news_sources    : languagesNews.news_sources
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
