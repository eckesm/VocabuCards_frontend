import {
	LOGIN_USER,
	LOGOUT_USER,
	LOGGED_IN_USER,
	GET_USER_LANGUAGE_WORDS,
	GET_ALL_LANGUAGE_OPTIONS,
	SET_USER_LANGUAGE,
	ADD_WORD,
	ADD_COMPONENT
} from './actions/types';

const INITIAL_STATE = {
	user            : null,
	words_array     : [],
	language        : null,
	languages       : [],
	language_object : {}
};

function sortByRoot(words_array) {
	// https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array for help with sorting objects in an array on a property in the array
	return words_array.sort((a, b) => {
		var textA = a.root.toUpperCase();
		var textB = b.root.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}
function sortByVariation(components_array) {
	// https://stackoverflow.com/questions/8900732/sort-objects-in-an-array-alphabetically-on-one-property-of-the-array for help with sorting objects in an array on a property in the array
	return components_array.sort((a, b) => {
		var textA = a.variation.toUpperCase();
		var textB = b.variation.toUpperCase();
		return textA < textB ? -1 : textA > textB ? 1 : 0;
	});
}

export default function rootReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case LOGIN_USER:
			return {
				...state,
				user : action.user
				// access_token : action.access_token
			};

		case LOGGED_IN_USER:
			return {
				...state,
				user : action.user
			};

		case LOGOUT_USER:
			return INITIAL_STATE;

		case GET_USER_LANGUAGE_WORDS:
			return {
				...state,
				words_array : action.words.words_array
			};

		case SET_USER_LANGUAGE:
			return {
				...state,
				language : action.language
			};

		case GET_ALL_LANGUAGE_OPTIONS:
			return {
				...state,
				languages       : action.languages,
				language_object : action.language_object
			};

		case ADD_WORD:
			return {
				...state,
				words_array : sortByRoot([ ...state.words_array, action.word ])
			};

		case ADD_COMPONENT:
			const root_id = action.component.root_id;
			const word = state.words_array.filter(w => w.id === root_id)[0];
			const adjustedWordsArray = state.words_array.filter(w => w.id !== root_id);
			const updatedWord = { ...word, components: sortByVariation([ ...word.components, action.component ]) };

			return {
				...state,
				words_array : sortByRoot([ ...adjustedWordsArray, updatedWord ])
			};

		default:
			return state;
	}
}
