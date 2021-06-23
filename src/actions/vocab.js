import axios from 'axios';
import {
	TRANSLATE_WORD,
	DICTIONARY_WORD,
	GET_USER_LANGUAGE_WORDS,
	SET_USER_LANGUAGE,
	GET_ALL_LANGUAGE_OPTIONS
} from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/vocab';

const access_token = localStorage.getItem('access_token') || null;

// TRANSLATE_WORD
export function translateWordViaAPI(word, source_code = 'sv', translate_code = 'en') {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + access_token
			};
			// console.log(headers)
			const res = await axios.get(`${API_URL}/translate/${word}/${source_code}/${translate_code}`, {
				headers : headers
			});
			const translatedWord = res.data;

			return dispatch(storeTranslatedWord(word, translatedWord, source_code, translate_code));
		} catch (e) {
			console.log(e);
		}
	};
}
function storeTranslatedWord(word, translatedWord, source_code, translate_code) {
	return {
		type        : TRANSLATE_WORD,
		translation : { word, translatedWord, source_code, translate_code }
	};
}

// DICTIONARY_WORD
export function dictionaryWordViaAPI(word, translate_code = 'en') {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + access_token
			};
			const res = await axios.get(`${API_URL}/dictionary/${word}`, { headers: headers });
			const results = res.data['results'];

			return dispatch(storeDictionaryWord(word, results, translate_code));
		} catch (e) {
			console.log(e);
		}
	};
}
function storeDictionaryWord(word, dictionaryResults, translate_code) {
	return {
		type       : DICTIONARY_WORD,
		dictionary : { word, dictionaryResults, translate_code }
	};
}

// GET_USER_LANGUAGE_WORDS
export function getUserLanguageWordsViaAPI(source_code = 'sv') {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + access_token
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
				Authorization : 'Bearer ' + access_token
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
				Authorization : 'Bearer ' + access_token
			};
			const res = await axios.get(`${API_URL}/last`, { headers: headers });
			let last_source_code = res.data;

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

// GET_ALL_LANGUAGE_OPTIONS
export function getAllLanguageOptionsViaAPI() {
	return async function(dispatch) {
		try {
			const headers = {
				Authorization : 'Bearer ' + access_token
			};
			const res = await axios.get(`${API_URL}/languages`, { headers: headers });
			let languages = res.data;

			const languageObject = {};
			languages.forEach(option => {
				languageObject[option[0]] = option[1];
			});

			return dispatch(setLanguageOptions(languages, languageObject));
		} catch (e) {
			console.log(e);
		}
	};
}
function setLanguageOptions(languages, language_object) {
	return {
		type            : GET_ALL_LANGUAGE_OPTIONS,
		languages,
		language_object
	};
}
