import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getDictionaryWordViaAPI, getTranslateWordViaAPI, createNewWord } from '../../helpers/API';

import SelectDictionary from './SelectDictionary';

const useStyles = makeStyles(theme => ({
	root : {
		'& .MuiTextField-root' : {
			margin : theme.spacing(1),
			width  : '25ch'
		}
	}
}));

export default function VocabWordForm() {
	const { language } = useSelector(store => store);
	const [ dictionaryChoices, setDictionaryChoices ] = useState([]);

	const [ formData, setFormData ] = useState({
		root        : '',
		translation : '',
		dictionary  : '',
		synonyms    : '',
		examples    : '',
		notes       : ''
	});

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		createNewWord(
			language,
			formData.root,
			formData.translation,
			formData.dictionary.definition,
			formData.synonyms,
			formData.examples
		);
	}

	function handleTranslate(evt) {
		evt.preventDefault();
		translateAPI();
	}
	async function translateAPI() {
		const results = await getTranslateWordViaAPI(formData.root);
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
			dictionary : dictionaryChoice,
			examples   : constructExamplesDisplay(dictionaryChoice['examples']),
			synonyms   : constructSynonymsDisplay(dictionaryChoice['synonyms'])
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
			<h1>Vocabulary Word Form</h1>
			<form onSubmit={handleSubmit} className={classes.root}>
				<TextField
					id="root"
					name="root"
					label="Root"
					onChange={handleChange}
					value={formData.root}
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

				<Button variant="outlined" type="submit" color="primary">
					Add Word
				</Button>
			</form>
		</div>
	);
}
