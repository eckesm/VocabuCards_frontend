import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { getTranslateWordViaAPI, createNewWord, editWord } from '../../helpers/API';
import { MAX_TRANSLATION_TEXT_LENGTH } from '../../settings';
import { addWordToState, editWordInState } from '../../actions/vocab';

const useStyles = makeStyles(theme => ({
	root            : {
		'& .MuiTextField-root' : {
			margin : theme.spacing(1),
			width  : '90%'
		}
	},
	container       : {
		fontFamily : 'roboto, sans-serif'
	},
	button          : {
		marginBottom : '15px',
		marginLeft   : '9px'
	},
	buttonContainer : {
		textAlign : 'center'
	},
	submitButton    : {
		marginTop    : '15px',
		marginBottom : '15px',
		marginLeft   : '9px'
	}
}));

export default function VocabWordForm({ onClose, word = null, setWord }) {
	const dispatch = useDispatch();
	const { language } = useSelector(store => store);

	let INITIAL_STATE = {
		word        : '',
		translation : '',
		notes       : ''
	};

	if (word) {
		INITIAL_STATE = {
			word        : word.root,
			translation : word.translation,
			notes       : word.notes
		};
	}

	const [ formData, setFormData ] = useState(INITIAL_STATE);
	const [ translateAble, setTranslateAble ] = useState(false);
	const [ translateLength, setTranslateLength ] = useState(true);

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

	useEffect(() => {
		if (formData.word) {
			if (formData.translation === '') {
				try {
					translateAPI();
				} catch (e) {
					console.log(e);
				}
			}
		}
	}, []);

	useEffect(
		() => {
			if (formData.word === '' || formData.word.length > MAX_TRANSLATION_TEXT_LENGTH) {
				setTranslateAble(false);
			}
			else {
				setTranslateAble(true);
			}

			if (formData.word.length > MAX_TRANSLATION_TEXT_LENGTH) {
				setTranslateLength(false);
			}
			else {
				setTranslateLength(true);
			}
		},
		[ formData ]
	);

	async function handleSubmit(evt) {
		evt.preventDefault();
		onClose();

		if (word) {
			const wordRes = await editWord(
				word.id,
				word.source_code,
				formData.word,
				formData.translation,
				formData.notes
			);
			dispatch(editWordInState(wordRes.word));
			setWord(wordRes.word);
		}
		else {
			const wordRes = await createNewWord(language, formData.word, formData.translation, formData.notes);
			dispatch(addWordToState(wordRes.word));
		}
	}

	function handleTranslate(evt) {
		evt.preventDefault();
		translateAPI();
	}
	async function translateAPI() {

		if (formData.word !== '') {
			const results = await getTranslateWordViaAPI(formData.word, language);
			try {
				if (results.status === 'success') {
					setFormData({ ...formData, translation: results.data });
				}
				else if (results.status === 'error') {
					console.log(results.length);
				}
			} catch (e) {
				console.log(e);
			}
		}
	}

	const classes = useStyles();

	return (
		<div className={classes.container}>
			{word && <h1>Edit Word</h1>}
			{!word && <h1>Add Word</h1>}
			<form onSubmit={handleSubmit} className={classes.root}>
				<div>
					<TextField
						id="word"
						name="word"
						label="Root Word"
						onChange={handleChange}
						value={formData.word}
						variant="outlined"
						autoCapitalize="false"
					/>
					<Button
						className={classes.button}
						variant="contained"
						color="primary"
						onClick={handleTranslate}
						disabled={translateAble ? false : true}
					>
						{translateLength ? 'Translate' : 'Too Long to Translate'}
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
				</div>

				<TextField
					id="notes"
					name="notes"
					label="Notes"
					multiline
					maxRows={4}
					onChange={handleChange}
					value={formData.notes}
					variant="outlined"
					autoCapitalize="false"
				/>
				<div className={classes.buttonContainer}>
					<Button
						className={classes.submitButton}
						variant="contained"
						type="submit"
						color="primary"
						size="large"
					>
						{word ? 'Save Word' : 'Add Word'}
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
				</div>
			</form>
		</div>
	);
}
