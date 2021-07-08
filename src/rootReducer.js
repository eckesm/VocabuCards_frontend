import {
	LOGOUT_USER,
	GET_USER_LANGUAGE_WORDS,
	GET_ALL_LANGUAGE_OPTIONS,
	SET_USER_LANGUAGE,
	ADD_WORD,
	EDIT_WORD,
	DELETE_WORD,
	ADD_COMPONENT,
	EDIT_COMPONENT,
	DELETE_COMPONENT,
	SET_TEXT_INPUT,
	ADD_ALERT,
	CLEAR_ALERTS,
	SET_ALERTS,
	GET_USER_INFO
} from './actions/types';

const INITIAL_STATE = {
	alerts             : [],
	first_login        : true,
	is_email_confirmed : false,
	language           : null,
	languages          : [],
	language_object    : {},
	last_login         : null,
	name               : '',
	text_input         : '',
	user               : null,
	words_array        : null
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
	let root_id = null;
	let word = null;
	let adjustedWordsArray = [];
	let adjustedComponentsArray = [];
	let updatedWord = {};

	switch (action.type) {
		case GET_USER_INFO:
			return {
				...state,
				is_email_confirmed : action.is_email_confirmed,
				language           : action.language,
				languages          : action.languages,
				language_object    : action.language_object,
				last_login         : action.last_login,
				text_input         : action.text_input,
				user               : action.user,
				words_array        : action.words_array
			};

		case ADD_ALERT:
			return {
				...state,
				alerts : [ ...state.alerts, action.alert ]
			};

		case SET_ALERTS:
			return {
				...state,
				alerts : action.alerts
			};

		case CLEAR_ALERTS:
			return {
				...state,
				alerts : []
			};

		case LOGOUT_USER:
			return INITIAL_STATE;

		case GET_USER_LANGUAGE_WORDS:
			return {
				...state,
				words_array : action.words_array
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

		case EDIT_WORD:
			adjustedWordsArray = state.words_array.filter(w => w.id !== action.word.id);

			return {
				...state,
				words_array : sortByRoot([ ...adjustedWordsArray, action.word ])
			};

		case DELETE_WORD:
			adjustedWordsArray = state.words_array.filter(w => w.id !== action.root_id);
			return {
				...state,
				words_array : adjustedWordsArray
			};

		case ADD_COMPONENT:
			root_id = action.component.root_id;
			word = state.words_array.filter(w => w.id === root_id)[0];
			adjustedWordsArray = state.words_array.filter(w => w.id !== root_id);
			updatedWord = { ...word, components: sortByVariation([ ...word.components, action.component ]) };
			return {
				...state,
				words_array : sortByRoot([ ...adjustedWordsArray, updatedWord ])
			};

		case EDIT_COMPONENT:
			root_id = action.component.root_id;
			word = state.words_array.filter(w => w.id === root_id)[0];
			adjustedWordsArray = state.words_array.filter(w => w.id !== root_id);
			adjustedComponentsArray = word.components.filter(c => c.id !== action.component.id);
			updatedWord = {
				...word,
				components : sortByVariation([ ...adjustedComponentsArray, action.component ])
			};
			return {
				...state,
				words_array : sortByRoot([ ...adjustedWordsArray, updatedWord ])
			};

		case DELETE_COMPONENT:
			word = state.words_array.filter(w => w.id === action.root_id)[0];
			adjustedWordsArray = state.words_array.filter(w => w.id !== action.root_id);
			adjustedComponentsArray = word.components.filter(c => c.id !== action.componentId);
			updatedWord = {
				...word,
				components : sortByVariation(adjustedComponentsArray)
			};
			return {
				...state,
				words_array : sortByRoot([ ...adjustedWordsArray, updatedWord ])
			};

		case SET_TEXT_INPUT:
			return {
				...state,
				text_input : action.textInput
			};

		default:
			return state;
	}
}
