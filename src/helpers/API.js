import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function getAccessToken() {
	return localStorage.getItem('access_token') || null;
}

export async function getTranslateWordViaAPI(word, source_code, translate_code = 'en') {
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

export async function getDictionaryWordViaAPI(word) {
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

export async function createNewWord(source_code, word, translation, notes) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};
	const data = {
		source_code    : source_code,
		part_of_speech : 'other',
		word           : word,
		translation    : translation,
		notes          : notes
	};

	try {
		const res = await axios.post(`${API_URL}/vocab/words/new`, data, { headers: headers });
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function editWord(id, source_code, word, translation, notes) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};
	const data = {
		word        : word,
		source_code : source_code,
		translation : translation,
		notes       : notes || ''
	};

	try {
		const res = await axios.put(`${API_URL}/vocab/words/${id}`, data, { headers: headers });

		console.log(res.data);
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function deleteWord(id) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};

	try {
		const res = await axios.delete(`${API_URL}/vocab/words/${id}`, { headers: headers });

		console.log(res.data);
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function createNewVariation(
	root_id,
	source_code,
	part_of_speech,
	word,
	translation,
	description,
	definition,
	synonyms,
	examples,
	notes
) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};
	const data = {
		root_id        : root_id,
		source_code    : source_code,
		part_of_speech : part_of_speech,
		word           : word,
		translation    : translation,
		description    : description,
		definition     : definition,
		synonyms       : synonyms,
		examples       : examples,
		notes          : notes
	};

	try {
		const res = await axios.post(`${API_URL}/vocab/variations/new`, data, { headers: headers });
		
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function editVariation(
	id,
	part_of_speech,
	word,
	translation,
	description,
	definition,
	synonyms,
	examples,
	notes
) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};
	const data = {
		// id             : id,
		part_of_speech : part_of_speech,
		word           : word,
		translation    : translation,
		description    : description,
		definition     : definition,
		synonyms       : synonyms,
		examples       : examples,
		notes          : notes
	};

	try {
		const res = await axios.put(`${API_URL}/vocab/variations/${id}`, data, { headers: headers });

		console.log(res.data);
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function deleteVariation(id) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};

	try {
		const res = await axios.delete(`${API_URL}/vocab/variations/${id}`, { headers: headers });

		console.log(res.data);
		return res.data;
	} catch (e) {
		console.log(e);
	}
}
