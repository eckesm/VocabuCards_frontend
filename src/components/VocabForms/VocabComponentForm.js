import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import { translateWordViaAPI, dictionaryWordViaAPI } from '../../actions/vocab';
import SelectDictionary from './SelectDictionary';
import SelectWord from './SelectWord';

import { getDictionaryWordViaAPI, getTranslateWordViaAPI, createNewVariation, createNewWord } from '../../helpers/API';
import { addWordToState, addComponentToState } from '../../actions/vocab';

const useStyles = makeStyles(theme => ({
	root : {
		'& .MuiTextField-root' : {
			margin : theme.spacing(1),
			width  : '25ch'
		}
	}
}));

export default function VocabComponentForm({ wordText, onClose }) {
	const dispatch = useDispatch();
	const { language, words_array } = useSelector(store => store);
	const [ dictionaryChoices, setDictionaryChoices ] = useState([]);
	const wordChoices = [];
	wordChoices.push({ value: 'NEW', name: 'Add new word' });
	words_array.forEach(choice => {
		wordChoices.push({ value: choice.id, name: choice.root });
	});

	console.log(wordChoices);

	const [ formData, setFormData ] = useState({
		partOfSpeech : '',
		variation    : wordText || '',
		translation  : '',
		dictionary   : '',
		synonyms     : '',
		examples     : '',
		notes        : '',
		existingWord : 'NEW'
	});

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

	useEffect(() => {
		if (wordText) {;
			try {
				translateAPI();
			} catch (e) {
				console.log(e);
			}
		}
	}, []);

	async function handleSubmit(evt) {
		evt.preventDefault();
		console.log('EXISTING WORD:', formData.existingWord);
		if (formData.existingWord === 'NEW') {
			console.log('New word');

			const wordRes = await createNewWord(
				language,
				formData.variation,
				formData.translation,
				formData.dictionary.definition,
				formData.synonyms,
				formData.examples
			);
			console.log(wordRes.word.id);

			dispatch(addWordToState(wordRes.word));

			const componentRes = await createNewVariation(
				wordRes.word.id,
				language,
				formData.partOfSpeech,
				formData.variation,
				formData.translation,
				formData.examples
			);
			dispatch(addComponentToState(componentRes.component));
		}
		else {
			console.log('New variation');
			const componentRes = await createNewVariation(
				formData.existingWord,
				language,
				formData.partOfSpeech,
				formData.variation,
				formData.translation,
				formData.examples
			);
			console.log(componentRes);
		}
		onClose();
	}

	function handleTranslate(evt) {
		evt.preventDefault();
		translateAPI();
	}
	async function translateAPI() {
		const results = await getTranslateWordViaAPI(formData.variation);
		setFormData({ ...formData, translation: results });
	}

	function handleDictionary(evt) {
		evt.preventDefault();
		dictionaryAPI();
	}
	async function dictionaryAPI() {
		const results = await getDictionaryWordViaAPI(formData.translation);
		setDictionaryChoices(results.results);
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
				<div>
					<TextField
						id="variation"
						name="variation"
						label="Variation"
						onChange={handleChange}
						value={formData.variation}
						variant="outlined"
					/>
					<Button variant="outlined" color="primary" onClick={handleTranslate}>
						Translate
					</Button>
				</div>

				<div>
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
				</div>

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
