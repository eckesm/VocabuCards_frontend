import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderHtml } from '../../helpers/renderingText';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import Paragraph from './Paragraph';
import VocabModal from '../VocabForms/VocabModal';
import { setTextInput } from '../../actions/vocab';
import { updateSavedRenderedText } from '../../helpers/API';

const useStyles = makeStyles(theme => ({
	root             : {
		'& > *' : {
			margin : theme.spacing(1),
			// width: '25ch',
			width  : '90%'
		}
	},
	renderTextScreen : {
		border          : '1px solid rgb(200, 200, 200)',
		borderRadius    : '3px',
		margin          : '20px',
		marginTop       : '40px',
		fontFamily      : 'roboto, sans-serif',
		backgroundColor : 'snow',
		boxShadow       : '5px 5px 8px grey'
	},
	renderTextOutput : {
		border          : '1px solid rgb(200, 200, 200)',
		borderRadius    : '3px',
		margin          : '53px',
		marginTop       : '25px',
		fontFamily      : 'roboto, sans-serif',
		backgroundColor : 'snow',
		padding         : '15px',
		textAlign       : 'left',
		fontSize        : '1.5rem'
	},
	empty:{
		textAlign:'center'
	}
}));

export default function RenderTextScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { text_input, language, language_object } = useSelector(store => store);

	const [ formData, setFormData ] = useState({
		foreignText : text_input
	});
	let [ renderedText, setRenderedText ] = useState([]);
	const [ modalText, setModalText ] = useState('');

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}
	const source_code = 'sv';
	const translate_code = 'en';

	function handleSubmit(evt) {
		evt.preventDefault();
		updateSavedRenderedText(formData.foreignText);
		dispatch(setTextInput(formData.foreignText));

		let prepareRenderedText = renderHtml(formData.foreignText, source_code, translate_code);
		setRenderedText(prepareRenderedText);
	}

	function updateModalText(wordObject) {
		setModalText(wordObject);
		setOpen(true);
	}

	const [ open, setOpen ] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(
		() => {
			if (text_input !== '' && text_input !== null) {
				setFormData({ ...formData, foreignText: text_input });
				let prepareRenderedText = renderHtml(text_input, source_code, translate_code);
				setRenderedText(prepareRenderedText);
			}
		},
		[ text_input ]
	);

	return (
		<div className={classes.renderTextScreen}>
			<h1>Study {language_object[language]} Text</h1>
			<form onSubmit={handleSubmit} className={classes.root}>
				<TextField
					id="foreignText"
					name="foreignText"
					label="Type or paste foreign language text"
					multiline
					rows={10}
					value={formData.foreignText}
					variant="outlined"
					onChange={handleChange}
				/>
				<Button variant="contained" type="submit" color="primary">
					Render
				</Button>
			</form>

			<div className={classes.renderTextOutput}>
				{renderedText.length === 0 && (
					<h4 className={classes.empty}>
						<i>
							...type or paste {language_object[language]} text into the input box then click RENDER to
							process...
						</i>
					</h4>
				)}

				{renderedText.length > 0 &&
					renderedText.map((paragraphArray, i) => {
						return <Paragraph key={i} paragraphArray={paragraphArray} updateModalText={updateModalText} />;
					})}
			</div>

			<VocabModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				wordText={modalText}
				setting="variation"
			/>
		</div>
	);
}
