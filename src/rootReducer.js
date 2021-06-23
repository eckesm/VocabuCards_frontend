import {
	LOGIN_USER,
	LOGOUT_USER,
	TRANSLATE_WORD,
	DICTIONARY_WORD,
	GET_USER_LANGUAGE_WORDS,
	GET_ALL_LANGUAGE_OPTIONS,
	SET_USER_LANGUAGE
} from './actions/types';

const INITIAL_STATE = {
	user             : null,
	access_token     : null,
	translations     : {},
	dictionary       : {},
	words_array      : {},
	language         : null,
	languages : [],
	language_object : {}
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
			return INITIAL_STATE;

		case TRANSLATE_WORD:
			return {
				...state,
				translations : {
					...state.translations,
					[`${action.translation.source_code}_${action.translation.translate_code}_${action.translation
						.word}`]: action.translation
				}
			};

		case DICTIONARY_WORD:
			return {
				...state,
				dictionary : {
					...state.dictionary,
					[`${action.dictionary.translate_code}_${action.dictionary.word}`]: action.dictionary
				}
			};

		case GET_USER_LANGUAGE_WORDS:
			return {
				...state,
				words_array : {
					...state.words_array,
					[`${action.words.source_code}`]: action.words.words_array
				}
			};

		case SET_USER_LANGUAGE:
			return {
				...state,
				language : action.language
			};

		case GET_ALL_LANGUAGE_OPTIONS:
			return {
				...state,
				languages : action.languages,
				language_object : action.language_object
			};

		default:
			return state;
	}
}
