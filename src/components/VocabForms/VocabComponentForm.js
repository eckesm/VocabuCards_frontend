import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import CustomButton from '../CustomButton';

import {
	getDictionaryWordViaAPI,
	getTranslateWordViaAPI,
	createNewVariation,
	createNewWord,
	editVariation
} from '../../helpers/API';
import { addWordToState, addComponentToState, editComponentInState } from '../../actions/vocab';

import SelectDictionary from './SelectDictionary';
import SelectWord from '../SelectWord';
import SelectPOS from './SelectPOS';
import VocabModal from './VocabModal';

const useStyles = makeStyles(theme => ({
	root                : {
		'& .MuiTextField-root' : {
			margin : theme.spacing(1),
			width  : '90%'
		}
	},
	container           : {
		fontFamily : 'roboto, sans-serif'
	},
	titleContainer      : {
		display        : 'flex',
		justifyContent : 'space-between',
		padding        : '10px'
	},
	button              : {
		marginBottom : '15px',
		marginLeft   : '9px'
	},
	buttonContainer     : {
		textAlign : 'center'
	},
	// editSavedbutton     : {
	// 	width        : '125px',
	// 	marginTop    : '3px',
	// 	marginBottom : '3px'
	// },
	savedButtonGroup    : {
		width        : '100%',
		// marginTop    : 'auto',
		// marginBottom : 'auto',
		// marginRight  : '0px',
		textAlign:'center'
	},
	submitButton        : {
		marginTop    : '15px',
		marginBottom : '15px',
		marginLeft   : '9px'
	},
	sectionContainer    : {
		border       : '1px solid rgb(200, 200, 200)',
		borderRadius : '3px',
		padding      : '5px',
		paddingTop   : '12px',
		marginTop    : '15px',
		marginBottom : '10px',
		marginLeft   : '-5px'
	},
	suggestions         : {
		fontSize   : '0.75rem',
		marginTop  : '0px',
		marginLeft : '10px'
	},
	instructions        : {
		marginTop : '0px'
	},
	sectionInstructions : {
		marginTop   : '0px',
		marginLeft  : '10px',
		marginRight : '10px'
	},
	wordAndButton       : {
		display : 'flex'
	}
}));

export default function VocabComponentForm({
	onClose,
	wordText = null,
	variation = null,
	setVariation = null,
	rootId = null,
	rootWord = null,
	setting = null
}) {
	const dispatch = useDispatch();
	const { language, words_array } = useSelector(store => store);
	const [ dictionaryChoices, setDictionaryChoices ] = useState([]);
	const wordChoices = [];
	wordChoices.push({ value: 'NEW', name: 'Add new word' });
	words_array.forEach(choice => {
		wordChoices.push({ value: choice.id, name: choice.root });
	});
	const [ showNewWord, setShowNewWord ] = useState(true);
	const [ useDictionary, setUseDictionary ] = useState(false);
	const [ searchDictionaryAble, setSearchDictionaryAble ] = useState(true);
	const [ translateAble, setTranslateAble ] = useState(true);
	const [ savedVariation, setSavedVariation ] = useState(false);

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
		newWord        : '',
		wordNotes      : ''
	};

	if (wordText) {
		INITIAL_STATE.variation = wordText.text.toLowerCase();
		INITIAL_STATE.examples = wordText.sentence || '';
		INITIAL_STATE.newWord = wordText.text.toLowerCase();
	}
	if (setting === 'edit_variation' || setting === 'edit_saved_variation') {
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
			newWord        : '',
			wordNotes      : ''
		};
	}
	if (setting === 'add_variation_of_root') {
		INITIAL_STATE.variation = rootWord;
		INITIAL_STATE.existingWord = rootId;
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
			if (formData.translation === '') {
				try {
					translateAPI(formData.variation);
				} catch (e) {
					console.log(e);
				}
			}
			if (wordText.savedRoot && wordText.savedComponent) {
				const word = words_array.filter(w => w.id === wordText.savedRoot)[0];
				setSavedVariation(word.components.filter(c => c.id === wordText.savedComponent)[0]);
			}
		}
	}, []);

	useEffect(
		() => {
			if (formData.variation === '') {
				setTranslateAble(false);
			}
			else {
				setTranslateAble(true);
			}
			if (formData.translation === '') {
				setSearchDictionaryAble(false);
				setUseDictionary(false);
			}
			else {
				setSearchDictionaryAble(true);
			}
		},
		[ formData ]
	);

	async function handleSubmit(evt) {
		evt.preventDefault();
		onClose();

		if (setting === 'edit_variation' || setting === 'edit_saved_variation') {
			const updatedComponent = {
				root_id        : variation.root_id,
				id             : variation.id,
				part_of_speech : formData.partOfSpeech,
				variation      : formData.variation,
				translation    : formData.translation,
				description    : formData.description,
				definition     : formData.definition,
				synonyms       : formData.synonyms,
				examples       : formData.examples,
				notes          : formData.variationNotes
			};
			dispatch(editComponentInState(updatedComponent));
			if (setting === 'edit_variation') {
				setVariation(updatedComponent);
			}

			const componentRes = await editVariation(
				variation.id,
				formData.partOfSpeech,
				formData.variation,
				formData.translation,
				formData.description,
				formData.variationNotes,
				formData.synonyms,
				formData.examples,
				formData.variationNotes
			);
			try {
				if (componentRes.status !== 'success') {
					console.log('Error updating component in database.');
				}
			} catch (e) {
				console.log('Error connecting to database.');
			}
		}
		else {
			if (formData.existingWord === 'NEW') {
				const wordRes = await createNewWord(
					language,
					// formData.variation,
					formData.newWord,
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
				const newComponent = {
					root_id        : formData.existingWord,
					part_of_speech : formData.partOfSpeech,
					variation      : formData.variation,
					translation    : formData.translation,
					description    : formData.description,
					definition     : formData.definition,
					synonyms       : formData.synonyms,
					examples       : formData.examples,
					notes          : formData.variationNotes
				};
				// dispatch(addComponentToState(componentRes.component));
				dispatch(addComponentToState(newComponent));

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
				try {
					if (componentRes.status !== 'success') {
						console.log('Error adding component to database.');
					}
				} catch (e) {
					console.log('Error connecting to database.');
				}
			}
		}
	}

	async function translateAPI() {
		if (formData.variation !== '') {
			const results = await getTranslateWordViaAPI(formData.variation, language);
			setFormData({ ...formData, translation: results });
		}
	}
	// async function translateExampleAPI() {
	// 	const results = await getTranslateWordViaAPI(formData.examples, language);
	// 	console.log(results);
	// }
	function handleDictionary(evt) {
		evt.preventDefault();
		setUseDictionary(true);
		dictionaryAPI();
	}

	function handleEnteringInfo() {
		setUseDictionary(false);
		setSearchDictionaryAble(true);
	}

	async function dictionaryAPI() {
		// setUseDictionary(false);
		if (formData.translation !== '') {
			setSearchDictionaryAble(false);
			const results = await getDictionaryWordViaAPI(formData.translation);
			setDictionaryChoices(results.results);
		}
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

	function showExistingWordTab() {
		window.open(`/#/words/${formData.existingWord}`, '_blank');
	}

	function showSavedWordTab() {
		window.open(`/#/words/${savedVariation.root_id}`, '_blank');
	}

	function returnSelection(wordChoice) {
		setFormData({
			...formData,
			existingWord : wordChoice
		});
		if (wordChoice === 'NEW') {
			setShowNewWord(true);
		}
		else {
			setShowNewWord(false);
		}
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

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<div className={classes.container}>
				{savedVariation &&
				setting !== 'edit_saved_variation' && (
					<div className={classes.savedButtonGroup}>
						<CustomButton
							// className={classes.editSavedbutton}
							// variant="contained"
							// color="primary"
							// customtype='fixed_width_125'
							onClick={showSavedWordTab}
							>
							View Saved Root Word
						</CustomButton>
						<CustomButton
							// className={classes.editSavedbutton}
							// variant="contained"
							// color="primary"
							// customtype='fixed_width_125'
							onClick={handleModalOpen}
						>
							Edit Saved Variation
						</CustomButton>
					</div>
				)}
			<div className={classes.titleContainer}>
				{setting === 'add_variation' ||
					(setting === 'add_variation_or_root' && !savedVariation && <h1>Add Word</h1>)}
				{setting === 'add_variation_or_root' && savedVariation && <h1>Add Duplicate Variation</h1>}

				{(setting === 'edit_variation' || setting === 'edit_saved_variation') && <h1>Edit Variation</h1>}

				{setting === 'add_variation_of_root' && (
					<h1>
						Add Variation of <i>{rootWord}</i>
					</h1>
				)}
				{modalOpen && (
					<VocabModal
						open={modalOpen}
						handleClose={handleModalClose}
						variation={savedVariation}
						setting="edit_saved_variation"
					/>
				)}
			</div>

			{setting === 'add_variation_or_root' ? (
				<p className={classes.instructions}>
					You must complete <b>Variation</b>, <b>Part of Speech</b>, and the <b>Add to Existing Word</b>{' '}
					section.
				</p>
			) : (
				<p className={classes.instructions}>
					You must complete <b>Variation</b> and <b>Part of Speech</b>.
				</p>
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
						required
					/>
					<Button
						className={classes.button}
						// variant="outlined"
						variant="contained"
						color="primary"
						onClick={translateAPI}
						disabled={translateAble ? false : true}
					>
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
					<TextField
						id="description"
						name="description"
						label="Description"
						onChange={handleChange}
						value={formData.description}
						variant="outlined"
						autoCapitalize="false"
					/>
					<p className={classes.suggestions}>
						<b>Suggestions:</b> singular, definite, past tense, etc.
					</p>
					<div className={classes.sectionContainer}>
						<div>
							<Button
								className={classes.button}
								variant="contained"
								color={useDictionary ? 'default' : 'primary'}
								onClick={handleDictionary}
								disabled={searchDictionaryAble ? false : true}
							>
								Search Dictionary
							</Button>
							<Button
								className={classes.button}
								variant="contained"
								color={useDictionary ? 'primary' : 'default'}
								onClick={handleEnteringInfo}
								disabled={useDictionary ? false : true}
							>
								{useDictionary ? 'Enter Info' : 'Entering Info'}
							</Button>
						</div>

						{useDictionary ? (
							<SelectDictionary
								id="dictionary"
								name="dictionary"
								label="Definition"
								updateDictionary={updateDictionary}
								dictionaryChoices={dictionaryChoices}
							/>
						) : (
							<TextField
								id="definition"
								name="definition"
								label="Definition"
								onChange={handleChange}
								value={formData.definition}
								variant="outlined"
								autoCapitalize="false"
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
							id="synonyms"
							name="synonyms"
							label="Synonyms"
							onChange={handleChange}
							value={formData.synonyms}
							variant="outlined"
							autoCapitalize="false"
						/>
					</div>
				</div>
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
					<div className={classes.sectionContainer}>
						<div className={classes.wordAndButton}>
							<SelectWord
								id="existingWord"
								name="existingWord"
								label="Add to Existing Word"
								wordChoices={wordChoices}
								returnSelection={returnSelection}
							/>
							{!showNewWord && (
								<CustomButton customtype="small" onClick={showExistingWordTab}>
									Show in New Tab
								</CustomButton>
							)}
						</div>

						{showNewWord && (
							<p className={classes.sectionInstructions}>
								If adding a new new word, you must complete <b>New Word</b>.
							</p>
						)}
						{showNewWord && (
							<TextField
								id="newWord"
								name="newWord"
								label="New Word"
								onChange={handleChange}
								value={formData.newWord}
								variant="outlined"
								autoCapitalize="false"
								required
							/>
						)}
						{showNewWord && (
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
					</div>
				)}
				<div className={classes.buttonContainer}>
					<CustomButton type="submit">
						{setting === 'edit_variation' || setting === 'edit_saved_variation' ? 'Save Word' : 'Add Word'}
					</CustomButton>
					<CustomButton customtype="default" onClick={onClose}>
						Close
					</CustomButton>
				</div>
			</form>
		</div>
	);
}
