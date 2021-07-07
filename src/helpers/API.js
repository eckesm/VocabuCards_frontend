import axios from 'axios';

export const API_URL = process.env.REACT_APP_API_URL || 'https://api.vocabucards.com';

export function getAccessToken() {
	return localStorage.getItem('access_token') || null;
}

export async function createStarterWordsViaAPI() {
	try {
		const headers = {
			Authorization : 'Bearer ' + getAccessToken()
		};
		const res = await axios.get(`${API_URL}/auth/starters`, {
			headers : headers
		});
		return res.data;
	} catch (e) {
		console.log(e);
	}
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

export async function confirmEmailViaAPI(token, password) {
	try {
		const data = {
			token    : token,
			password : password
		};
		const res = await axios.post(`${API_URL}/confirm-email`, data);
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function sendPasswordResetViaAPI(email) {
	try {
		const data = {
			email_address : email
		};
		const res = await axios.post(`${API_URL}/send-password-reset`, data);
		return res.data;
	} catch (e) {
		console.log(e);
	}
}

export async function resetPasswordViaAPI(token, password, password_check) {
	try {
		const data = {
			token,
			password,
			password_check
		};
		const res = await axios.post(`${API_URL}/password-reset`, data);
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

export async function updateSavedRenderedText(text) {
	const headers = {
		Authorization : 'Bearer ' + getAccessToken()
	};
	const data = {
		text : text || ''
	};

	try {
		const res = await axios.put(`${API_URL}/vocab/renderedtext`, data, { headers: headers });
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
		return res.data;
	} catch (e) {
		console.log(e);
	}
}
