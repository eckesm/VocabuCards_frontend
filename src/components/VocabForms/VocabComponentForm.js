import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import {
	getDictionaryWordViaAPI,
	getTranslateWordViaAPI,
	createNewVariation,
	createNewWord,
	editVariation
	// refreshAccessTokenViaAPI
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

export default function VocabComponentForm({
	onClose,
	wordText = null,
	variation = null,
	setVariation,
	rootId = null,
	rootWord = null,
	setting = null
}) {
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
	const [ useDictionary, setUseDictionary ] = useState(true);
	const [ searchDictionaryAble, setSearchDictionaryAble ] = useState(true);

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
		INITIAL_STATE.variation = wordText.text.toLowerCase();
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
	if (rootId) {
		INITIAL_STATE.existingWord = rootId;
	}

	const [ formData, setFormData ] = useState(INITIAL_STATE);

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
		if (name === 'translation') {
			setSearchDictionaryAble(true);
		}
	}

	useEffect(() => {
		if (wordText) {
			if (formData.translation === '') {
				try {
					translateAPI(formData.variation);
				} catch (e) {
					console.log(e);
				}
			}
		}
	}, []);

	async function handleSubmit(evt) {
		evt.preventDefault();
		onClose();

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
		setUseDictionary(false);
		setSearchDictionaryAble(false);
		const results = await getDictionaryWordViaAPI(formData.translation);
		setDictionaryChoices(results.results);
	}

	function updateDictionary(dictionaryChoice) {
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
			{setting === 'add_variation' || (setting === 'add_variation_or_root' && <h1>Add Word</h1>)}
			{setting === 'edit_variation' && <h1>Edit Word</h1>}
			{setting === 'add_variation_of_root' && (
				<h1>
					Add Variation of <i>{rootWord}</i>
				</h1>
			)}
			<form onSubmit={handleSubmit} className={classes.root}>
				<div>
					<TextField
						id="variation"
						name="variation"
						label="Variation"
						onChange={handleChange}
						value={formData.variation}
						variant="outlined"
						autoCapitalize="false"
					/>
					<Button className={classes.button} variant="outlined" color="primary" onClick={translateAPI}>
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
						autoCapitalize="false"
					/>
					<div>
						<Button
							className={classes.button}
							variant={!useDictionary ? 'contained' : 'outlined'}
							color={useDictionary ? 'primary' : 'default'}
							onClick={handleDictionary}
							disabled={useDictionary || searchDictionaryAble ? false : true}
						>
							{useDictionary || searchDictionaryAble ? 'Search Dictionary' : 'Searching Dictionary'}
						</Button>
						<Button
							className={classes.button}
							variant={useDictionary ? 'contained' : 'outlined'}
							color={useDictionary ? 'default' : 'primary'}
							onClick={() => setUseDictionary(true)}
							disabled={useDictionary ? true : false}
						>
							{useDictionary ? 'Entering Info' : 'Enter Info'}
						</Button>
					</div>
				</div>
				{useDictionary ? (
					<TextField
						id="definition"
						name="definition"
						label="Definition"
						onChange={handleChange}
						value={formData.definition}
						variant="outlined"
						autoCapitalize="false"
					/>
				) : (
					<SelectDictionary
						id="dictionary"
						name="dictionary"
						label="Definition"
						updateDictionary={updateDictionary}
						dictionaryChoices={dictionaryChoices}
					/>
				)}
				<SelectPOS
					id="partOfSpeech"
					name="partOfSpeech"
					label="Part of Speech"
					updatePOS={updatePOS}
					value={formData.partOfSpeech}
				/>
				<TextField
					id="description"
					name="description"
					label="Description"
					onChange={handleChange}
					value={formData.description}
					variant="outlined"
					autoCapitalize="false"
				/>
				<TextField
					id="synonyms"
					name="synonyms"
					label="Synonyms"
					onChange={handleChange}
					value={formData.synonyms}
					variant="outlined"
					autoCapitalize="false"
				/>
				<TextField
					id="examples"
					name="examples"
					label="Example"
					onChange={handleChange}
					value={formData.examples}
					variant="outlined"
					autoCapitalize="false"
				/>
				{/* <TextField
					id="variationNotes"
					name="variationNotes"
					label="Variation Notes"
					onChange={handleChange}
					value={formData.variationNotes}
					variant="outlined"
					autoCapitalize="false"
				/> */}
				{setting === 'add_variation_or_root' && (
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
				setting === 'add_variation_or_root' && (
					<TextField
						id="wordNotes"
						name="wordNotes"
						label="Word Notes"
						onChange={handleChange}
						value={formData.wordNotes}
						variant="outlined"
						autoCapitalize="false"
					/>
				)}
				<Button className={classes.submitButton} variant="contained" type="submit" color="primary" size="large">
					{setting === 'edit_variation' ? 'Save Word' : 'Add Word'}
				</Button>
				<Button
					className={classes.submitButton}
					variant="contained"
					type="submit"
					color="default"
					size="large"
					onClick={onClose}
				>
					Close
				</Button>
			</form>
		</div>
	);
}
