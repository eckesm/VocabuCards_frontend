import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { translateWordViaAPI, dictionaryWordViaAPI } from '../../actions/vocab';
import SelectDictionary from './SelectDictionary';
import SelectWord from './SelectWord';

const useStyles = makeStyles(theme => ({
	root : {
		'& .MuiTextField-root' : {
			margin : theme.spacing(1),
			width  : '25ch'
		}
	}
}));

export default function VocabComponentForm({ wordText }) {
	const dispatch = useDispatch();
	// const history = useHistory();

	const { translations, dictionary, language } = useSelector(store => store);

	const languageWords = useSelector(store => store.words_array[language]);

	const [ dictionaryChoices, setDictionaryChoices ] = useState([]);
	// const [ wordChoices, setWordChoices ] = useState([ { id: 'NEW', root: 'Add new word' }, ...languageWords ]);
	const wordChoices = [ { id: 'NEW', root: 'Add new word' }, ...languageWords ];

	const [ formData, setFormData ] = useState({
		partOfSpeech : '',
		variation    : wordText || '',
		translation  : '',
		dictionary   : '',
		synonyms     : '',
		examples     : '',
		notes        : '',
		existingWord : ''
	});

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

	useEffect(() => {
		try {
			if (wordText) {
				dispatch(translateWordViaAPI(formData.variation));
			}
		} catch (e) {
			console.log(e);
		}
	}, []);

	useEffect(
		() => {
			try {
				setFormData({
					...formData,
					translation : translations[`sv_en_${formData.variation}`]['translatedWord']
				});
			} catch (e) {
				console.log(e);
			}
		},
		[ translations ]
	);

	useEffect(
		() => {
			try {
				setDictionaryChoices(dictionary[`en_${formData.translation}`]['dictionaryResults']);
			} catch (e) {
				console.log(e);
			}
		},
		[ dictionary ]
	);

	function handleSubmit(evt) {
		evt.preventDefault();
	}

	function handleTranslate(evt) {
		evt.preventDefault();
		dispatch(translateWordViaAPI(formData.variation));
	}

	function handleDictionary(evt) {
		evt.preventDefault();
		dispatch(dictionaryWordViaAPI(formData.translation));
	}

	function updateDictionary(dictionaryChoice) {
		setFormData({
			...formData,
			dictionary   : dictionaryChoice,
			partOfSpeech : dictionaryChoice['partOfSpeech'],
			examples     : constructExamplesDisplay(dictionaryChoice['examples']),
			synonyms     : constructSynonymsDisplay(dictionaryChoice['synonyms'])
		});
	}

	function updateExistingWord(wordChoice) {
		setFormData({
			...formData,
			existingWord : wordChoice
		});
	}

	function constructExamplesDisplay(array) {
		let display = '';
		if (array) {
			for (let index = 0; index < array.length; index++) {
				if (index > 0) {
					display += '; ';
				}
				display += array[index];
			}
		}
		else {
			display = '';
		}
		return display;
	}

	function constructSynonymsDisplay(array) {
		let display = '';
		if (array) {
			for (let index = 0; index < array.length; index++) {
				if (index > 0) {
					display += ', ';
				}
				display += array[index];
			}
		}
		else {
			display = '';
		}
		return display;
	}

	const classes = useStyles();

	return (
		<div>
			<h1>Vocabulary Component Form</h1>
			<form onSubmit={handleSubmit} className={classes.root}>
				<TextField
					id="variation"
					label="Variation"
					onChange={handleChange}
					value={formData.variation}
					variant="outlined"
				/>
				<Button variant="outlined" color="primary" onClick={handleTranslate}>
					Translate
				</Button>

				<TextField
					id="translation"
					name="translation"
					label="Translation"
					onChange={handleChange}
					value={formData.translation}
					variant="outlined"
				/>
				<Button variant="outlined" color="primary" onClick={handleDictionary}>
					Search Dictionary
				</Button>

				<SelectDictionary
					id="dictionary"
					name="dictionary"
					label="Dictionary"
					updateDictionary={updateDictionary}
					dictionaryChoices={dictionaryChoices}
					value={formData.dictionary}
				/>

				<TextField
					id="partOfSpeech"
					name="partOfSpeech"
					label="Part of Speech"
					onChange={handleChange}
					value={formData.partOfSpeech}
					variant="outlined"
				/>

				<TextField
					id="synonyms"
					name="synonyms"
					label="Synonyms"
					onChange={handleChange}
					value={formData.synonyms}
					variant="outlined"
				/>

				<TextField
					id="examples"
					name="examples"
					label="Examples"
					onChange={handleChange}
					value={formData.examples}
					variant="outlined"
				/>

				<TextField
					id="notes"
					name="notes"
					label="Notes"
					onChange={handleChange}
					value={formData.notes}
					variant="outlined"
				/>

				<SelectWord
					id="existingWord"
					name="existingWord"
					label="Add to Existing Word"
					updateExistingWord={updateExistingWord}
					wordChoices={wordChoices}
					value={formData.existingWord}
				/>

				<Button variant="outlined" type="submit" color="primary">
					Add
				</Button>
			</form>
		</div>
	);
}
