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
	SET_CURRENT_ARTICLE,
	ADD_ALERT,
	CLEAR_ALERTS,
	SET_ALERTS,
	REMOVE_ALERT,
	GET_USER_INFO,
	GET_STRIPE_CUSTOMER_ID
} from './actions/types';

const INITIAL_STATE = {
	account_override            : null,
	alerts                      : [],
	current_article             : null,
	current_plan                : null,
	first_login                 : null,
	is_email_confirmed          : null,
	language                    : null,
	languages                   : [],
	language_object             : {},
	last_login                  : null,
	name                        : '',
	news_sources                : {},
	stripe_cancel_at_period_end : null,
	stripe_canceled_at          : null,
	stripe_customer_id          : null,
	stripe_payment_method       : null,
	stripe_period_end           : null,
	stripe_period_start         : null,
	subscription_status         : null,
	text_input                  : null,
	trial_end                   : null,
	trial_start                 : null,
	user                        : null,
	variations                  : {},
	words_array                 : null
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
function createVariationsObject(words) {
	const variationsObject = {};
	words.forEach(word => {
		word.components.forEach(component => {
			variationsObject[component.variation] = {
				component_id   : component.id,
				part_of_speech : component.part_of_speech,
				root_id        : component.root_id,
				translation    : component.translation
			};
		});
	});
	return variationsObject;
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
				account_override            : action.account_override,
				current_article             : action.current_article,
				current_plan                : action.current_plan,
				first_login                 : action.first_login,
				is_email_confirmed          : action.is_email_confirmed,
				language                    : action.language,
				languages                   : action.languages,
				language_object             : action.language_object,
				last_login                  : action.last_login,
				name                        : action.name,
				news_sources                : action.news_sources,
				stripe_cancel_at_period_end : action.stripe_cancel_at_period_end,
				stripe_canceled_at          : action.stripe_canceled_at,
				stripe_customer_id          : action.stripe_customer_id,
				stripe_payment_method       : action.stripe_payment_method,
				stripe_period_end           : action.stripe_period_end,
				stripe_period_start         : action.stripe_period_start,
				subscription_status         : action.subscription_status,
				text_input                  : action.text_input,
				trial_end                   : action.trial_end,
				trial_start                 : action.trial_start,
				user                        : action.user,
				variations                  : createVariationsObject(action.words_array),
				words_array                 : action.words_array
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

		case REMOVE_ALERT:
			return {
				...state,
				alerts : state.alerts.filter(alert => alert.id !== action.alertId)
			};

		case LOGOUT_USER:
			return {
				...INITIAL_STATE,
				language        : state.language,
				languages       : state.languages,
				language_object : state.language_object,
				news_sources    : state.news_sources
			};

		case GET_USER_LANGUAGE_WORDS:
			return {
				...state,
				words_array : action.words_array,
				variations  : createVariationsObject(action.words_array)
			};
		case GET_STRIPE_CUSTOMER_ID:
			return {
				...state,
				stripe_customer_id : action.stripe_customer_id
			};

		case SET_USER_LANGUAGE:
			return {
				...state,
				current_article : null,
				language        : action.language
			};

		case GET_ALL_LANGUAGE_OPTIONS:
			return {
				...state,
				languages       : action.languages,
				language_object : action.language_object,
				news_sources    : action.news_sources
			};

		case ADD_WORD:
			return {
				...state,
				words_array : sortByRoot([ ...state.words_array, action.word ]),
				variations  : createVariationsObject([ ...state.words_array, action.word ])
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
				words_array : adjustedWordsArray,
				variations  : createVariationsObject(adjustedWordsArray)
			};

		case ADD_COMPONENT:
			root_id = action.component.root_id;
			word = state.words_array.filter(w => w.id === root_id)[0];
			adjustedWordsArray = state.words_array.filter(w => w.id !== root_id);
			updatedWord = { ...word, components: sortByVariation([ ...word.components, action.component ]) };
			return {
				...state,
				words_array : sortByRoot([ ...adjustedWordsArray, updatedWord ]),
				variations  : createVariationsObject([ ...adjustedWordsArray, updatedWord ])
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
				words_array : sortByRoot([ ...adjustedWordsArray, updatedWord ]),
				variations  : createVariationsObject([ ...adjustedWordsArray, updatedWord ])
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
				words_array : sortByRoot([ ...adjustedWordsArray, updatedWord ]),
				variations  : createVariationsObject([ ...adjustedWordsArray, updatedWord ])
			};

		case SET_TEXT_INPUT:
			return {
				...state,
				text_input : action.textInput
			};

		case SET_CURRENT_ARTICLE:
			return {
				...state,
				current_article : action.articleId
			};

		default:
			return state;
	}
}
