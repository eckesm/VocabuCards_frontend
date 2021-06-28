import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function getAccessToken() {
	return localStorage.getItem('access_token') || null;
}

export async function getTranslateWordViaAPI(word, source_code = 'sv', translate_code = 'en') {
	try {
		const headers = {
			Authorization : 'Bearer ' + getAccessToken()
		};
		const res = await axios.get(`${API_URL}/vocab/translate/${word}/${source_code}/${translate_code}`, {
			headers : headers
		});
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function getDictionaryWordViaAPI(word, translate_code = 'en') {
	try {
		const headers = {
			Authorization : 'Bearer ' + getAccessToken()
		};
		const res = await axios.get(`${API_URL}/vocab/dictionary/${word}`, { headers: headers });
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function createNewWord(source_code, word, translation, definition, synonyms, examples) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};
	const data = {
		source_code    : source_code,
		part_of_speech : 'other',
		word           : word,
		translation    : translation,
		definition     : definition,
		synonyms       : synonyms,
		examples       : examples
	};

	// console.log(data);

	try {
		const res = await axios.post(`${API_URL}/vocab/words/new`, data, { headers: headers });
		// console.log(res.data);
		return res.data;
	} catch (e) {
		console.log(e);
	}

	// if (response.data['status'] == 'errors') {
	// 	errors = response.data['errors'];
	// 	for (let error in errors) {
	// 		for (let err of errors[error]) {
	// 			console.log(err);
	// 			$('#errors_ul').append(`<li>${err}</li>`);
	// 		}
	// 	}
	// }
	// else {
	// 	window.open(`/words/${response.data['word']['id']}`, '_blank');
	// 	$('#studyMaterialModel').modal('hide');
	// }
}

export async function createNewVariation(root_id, source_code, part_of_speech, word, translation, examples) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};
	const data = {
		root_id        : root_id,
		source_code    : source_code,
		part_of_speech : part_of_speech,
		word           : word,
		translation    : translation,
		examples       : examples
	};

	try {
		const res = await axios.post(`${API_URL}/vocab/variations/new`, data, { headers: headers });

		console.log(res.data);
		return res.data;
	} catch (e) {
		console.log(e);
	}

	// if (response.data['status'] == 'errors') {
	// 	errors = response.data['errors'];
	// 	for (let error in errors) {
	// 		for (let err of errors[error]) {
	// 			console.log(err);
	// 			$('#errors_ul').append(`<li>${err}</li>`);
	// 		}
	// 	}
	// }
	// else {
	// 	window.open(`/words/${response.data['component']['root_id']}`, '_blank');
	// 	$('#studyMaterialModel').modal('hide');
	// }
}
