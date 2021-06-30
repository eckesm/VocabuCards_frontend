import axios from 'axios';
import {
	LOGGED_IN_USER,
	GET_USER_LANGUAGE_WORDS,
	SET_USER_LANGUAGE,
	GET_ALL_LANGUAGE_OPTIONS,
	ADD_WORD,
	ADD_COMPONENT,
	SET_TEXT_INPUT
} from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/vocab';

function getTextInput() {
	return localStorage.getItem('text_input') || null;
}

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
				let data = res.data;
				dispatch(setLanguageOptions(data.languages));
				dispatch(setUserLanguage(data.last_source_code));
				dispatch(storeUserLanguageWords(data.words_array, data.last_source_code));
				dispatch(loggedInUserInfo(data.user));
				dispatch(setTextInputInState(getTextInput()));
			} catch (e) {
				console.log(e);
			}
		}
		// else {
			// console.log('No access token present');
		// }
	};
}

function loggedInUserInfo(email) {
	return {
		type : LOGGED_IN_USER,
		user : email
	};
}

// TRANSLATE_WORD
// export function translateWordViaAPI(word, source_code = 'sv', translate_code = 'en') {
// 	return async function(dispatch) {
// 		try {
// 			const headers = {
// 				Authorization : 'Bearer ' + getAccessToken()
// 			};
// 			// console.log(headers)
// 			const res = await axios.get(`${API_URL}/translate/${word}/${source_code}/${translate_code}`, {
// 				headers : headers
// 			});
// 			const translatedWord = res.data;

// 			return dispatch(storeTranslatedWord(word, translatedWord, source_code, translate_code));
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	};
// }
// function storeTranslatedWord(word, translatedWord, source_code, translate_code) {
// 	return {
// 		type        : TRANSLATE_WORD,
// 		translation : { word, translatedWord, source_code, translate_code }
// 	};
// }

// DICTIONARY_WORD
// export function dictionaryWordViaAPI(word, translate_code = 'en') {
// 	return async function(dispatch) {
// 		try {
// 			const headers = {
// 				Authorization : 'Bearer ' + getAccessToken()
// 			};
// 			const res = await axios.get(`${API_URL}/dictionary/${word}`, { headers: headers });
// 			const results = res.data['results'];

// 			return dispatch(storeDictionaryWord(word, results, translate_code));
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	};
// }
// function storeDictionaryWord(word, dictionaryResults, translate_code) {
// 	return {
// 		type       : DICTIONARY_WORD,
// 		dictionary : { word, dictionaryResults, translate_code }
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

			return dispatch(storeUserLanguageWords(words_array, source_code));
		} catch (e) {
			console.log(e);
		}
	};
}
function storeUserLanguageWords(words_array, source_code) {
	return {
		type  : GET_USER_LANGUAGE_WORDS,
		words : { words_array, source_code }
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

			return dispatch(setUserLanguage(last_source_code));
		} catch (e) {
			console.log(e);
		}
	};
}
export function getUserLastLanguageViaAPI() {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + getAccessToken()
			};
			const res = await axios.get(`${API_URL}/last`, { headers: headers });
			const last_source_code = res.data;

			return dispatch(setUserLanguage(last_source_code));
		} catch (e) {
			console.log(e);
		}
	};
}

// SET_USER_LANGUAGE
export function setUserLanguage(source_code) {
	// localStorage.setItem('last_language', source_code)
	return {
		type     : SET_USER_LANGUAGE,
		language : source_code
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
	// localStorage.setItem('languages', languages)
	// localStorage.setItem('language_object', languageObject)

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

// ADD_COMPONENT
export function addComponentToState(componentObject) {
	return function(dispatch) {
		dispatch({
			type      : ADD_COMPONENT,
			component : componentObject
		});
	};
}

// SET_TEXT_INPUT
export function setTextInput(textInput) {
	localStorage.setItem('text_input', textInput);
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
