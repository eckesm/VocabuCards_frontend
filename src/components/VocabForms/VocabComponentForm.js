import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { useHistory } from 'react-router';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
	getDictionaryWordViaAPI,
	getTranslateWordViaAPI,
	createNewVariation,
	createNewWord,
	editVariation
} from '../../helpers/API';
import { addWordToState, addComponentToState, editComponentInState } from '../../actions/vocab';

import SelectDictionary from './SelectDictionary';
import SelectWord from './SelectWord';
import SelectPOS from './SelectPOS';

const useStyles = makeStyles(theme => ({
	root         : {
		'& .MuiTextField-root' : {
			margin : theme.spacing(1),
			width  : '90%'
		}
	},
	container    : {
		fontFamily : 'roboto, sans-serif'
	},
	button       : {
		marginBottom : '15px',
		marginLeft   : '9px'
	},
	submitButton : {
		marginTop    : '15px',
		marginBottom : '15px',
		marginLeft   : '9px'
	}
}));

export default function VocabComponentForm({ onClose, wordText = null, variation = null, setVariation }) {
	const dispatch = useDispatch();
	// const history = useHistory();

	const { language, words_array } = useSelector(store => store);
	const [ dictionaryChoices, setDictionaryChoices ] = useState([]);
	const wordChoices = [];
	wordChoices.push({ value: 'NEW', name: 'Add new word' });
	words_array.forEach(choice => {
		wordChoices.push({ value: choice.id, name: choice.root });
	});
	const [ showWordNotes, setShowWordNotes ] = useState(true);

	let INITIAL_STATE = {
		partOfSpeech   : '',
		variation      : '',
		translation    : '',
		description    : '',
		dictionary     : '',
		definition     : '',
		synonyms       : '',
		examples       : '',
		variationNotes : '',
		existingWord   : 'NEW',
		wordNotes      : ''
	};

	if (wordText) {
		INITIAL_STATE.variation = wordText.text;
		INITIAL_STATE.examples = wordText.sentence || '';
	}

	if (variation) {
		INITIAL_STATE = {
			partOfSpeech   : variation.part_of_speech,
			variation      : variation.variation,
			translation    : variation.translation,
			description    : variation.description,
			dictionary     : '',
			definition     : variation.definition,
			synonyms       : variation.synonyms,
			examples       : variation.examples,
			variationNotes : variation.notes,
			existingWord   : variation.root_id,
			wordNotes      : ''
		};
	}

	const [ formData, setFormData ] = useState(INITIAL_STATE);

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

	useEffect(() => {
		if (wordText) {
			try {
				translateAPI(formData.variation);
			} catch (e) {
				console.log(e);
			}
		}
	}, []);

	async function handleSubmit(evt) {
		evt.preventDefault();

		if (variation) {
			const componentRes = await editVariation(
				variation.id,
				formData.partOfSpeech,
				formData.variation,
				formData.translation,
				formData.description,
				formData.definition,
				formData.synonyms,
				formData.examples,
				formData.variationNotes
			);
			dispatch(editComponentInState(componentRes.component));
			setVariation(componentRes.component);
			// history.push(`/words/${variation.root_id}`);
		}
		else {
			if (formData.existingWord === 'NEW') {
				const wordRes = await createNewWord(
					language,
					formData.variation,
					formData.translation,
					formData.wordNotes
				);
				dispatch(addWordToState(wordRes.word));

				const componentRes = await createNewVariation(
					wordRes.word.id,
					language,
					formData.partOfSpeech,
					formData.variation,
					formData.translation,
					formData.description,
					formData.definition,
					formData.synonyms,
					formData.examples,
					formData.variationNotes
				);
				dispatch(addComponentToState(componentRes.component));
			}
			else {
				const componentRes = await createNewVariation(
					formData.existingWord,
					language,
					formData.partOfSpeech,
					formData.variation,
					formData.translation,
					formData.description,
					formData.definition,
					formData.synonyms,
					formData.examples,
					formData.variationNotes
				);
				dispatch(addComponentToState(componentRes.component));
			}
		}

		onClose();
	}

	async function translateAPI() {
		const results = await getTranslateWordViaAPI(formData.variation, language);
		setFormData({ ...formData, translation: results });
	}
	// async function translateExampleAPI() {
	// 	const results = await getTranslateWordViaAPI(formData.examples, language);
	// 	console.log(results);
	// }
	function handleDictionary(evt) {
		evt.preventDefault();
		dictionaryAPI();
	}
	async function dictionaryAPI() {
		const results = await getDictionaryWordViaAPI(formData.translation);
		setDictionaryChoices(results.results);
	}

	function updateDictionary(dictionaryChoice) {
		console.log(dictionaryChoice.partOfSpeech);
		setFormData({
			...formData,
			dictionary   : dictionaryChoice,
			definition   : dictionaryChoice['definition'],
			partOfSpeech : dictionaryChoice['partOfSpeech'],
			// examples     : constructExamplesDisplay(dictionaryChoice['examples']),
			synonyms     : constructSynonymsDisplay(dictionaryChoice['synonyms'])
		});
	}

	function updateExistingWord(wordChoice) {
		setFormData({
			...formData,
			existingWord : wordChoice
		});
	}

	function updatePOS(pos) {
		setFormData({
			...formData,
			partOfSpeech : pos
		});
	}

	// function constructExamplesDisplay(array) {
	// 	let display = '';
	// 	if (array) {
	// 		for (let index = 0; index < array.length; index++) {
	// 			if (index > 0) {
	// 				display += '; ';
	// 			}
	// 			display += array[index];
	// 		}
	// 	}
	// 	else {
	// 		display = '';
	// 	}
	// 	return display;
	// }

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
		<div className={classes.container}>
			{variation && <h1>Edit Word</h1>}
			{!variation && <h1>Add Word</h1>}
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
					<Button className={classes.button} variant="outlined" color="primary" onClick={translateAPI}>
						Translate
					</Button>
				</div>

				<TextField
					id="examples"
					name="examples"
					label="Example"
					onChange={handleChange}
					value={formData.examples}
					variant="outlined"
				/>

				<div className="VocabComponentForm-groups">
					<TextField
						id="translation"
						name="translation"
						label="Translation"
						onChange={handleChange}
						value={formData.translation}
						variant="outlined"
					/>
					<Button className={classes.button} variant="outlined" color="primary" onClick={handleDictionary}>
						Search Dictionary
					</Button>
				</div>

				<TextField
					id="description"
					name="description"
					label="Description"
					onChange={handleChange}
					value={formData.description}
					variant="outlined"
				/>

				<SelectDictionary
					id="dictionary"
					name="dictionary"
					label="Dictionary"
					updateDictionary={updateDictionary}
					dictionaryChoices={dictionaryChoices}
					// value={formData.dictionary}
				/>

				<SelectPOS
					id="partOfSpeech"
					name="partOfSpeech"
					label="Part of Speech"
					updatePOS={updatePOS}
					value={formData.partOfSpeech}
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
					id="variationNotes"
					name="variationNotes"
					label="Variation Notes"
					onChange={handleChange}
					value={formData.variationNotes}
					variant="outlined"
				/>

				{variation === null && (
					<SelectWord
						id="existingWord"
						name="existingWord"
						label="Add to Existing Word"
						updateExistingWord={updateExistingWord}
						wordChoices={wordChoices}
						setShowWordNotes={setShowWordNotes}
					/>
				)}

				{showWordNotes &&
				variation === null && (
					<TextField
						id="wordNotes"
						name="wordNotes"
						label="Word Notes"
						onChange={handleChange}
						value={formData.wordNotes}
						variant="outlined"
					/>
				)}

				<Button className={classes.submitButton} variant="contained" type="submit" color="primary" size="large">
					{variation ? 'Save' : 'Add Word'}
				</Button>
			</form>
		</div>
	);
}
