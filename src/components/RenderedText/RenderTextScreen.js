import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderHtml } from '../../helpers/helpers';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import { v4 as uuid } from 'uuid';
import Paragraph from './Paragraph';
import VocabForm from '../VocabForms/VocabForm';
import { setTextInput } from '../../actions/vocab';

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
		marginTop       : '100px',
		fontFamily      : 'roboto, sans-serif',
		backgroundColor : 'snow',
		boxShadow       : '5px 5px 8px grey'
	}
}));

export default function RenderTextScreen() {
	const dispatch = useDispatch();
	const { text_input } = useSelector(store => store);

	const [ formData, setFormData ] = useState({
		foreignText : text_input
	});
	let [ renderedText, setRenderedText ] = useState([ [] ]);
	const [ modalText, setModalText ] = useState(null);

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
		dispatch(setTextInput(formData.foreignText));
		let prepareRenderedText = renderHtml(formData.foreignText, source_code, translate_code);
		setRenderedText(prepareRenderedText);
	}

	function updateModalText(wordObject) {
		// setModalText(wordObject.text);
		setModalText(wordObject);
		setOpen(true);
		// console.log(wordObject.sentence);
	}

	const classes = useStyles();

	const [ open, setOpen ] = React.useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.renderTextScreen}>
			<h1>RENDER TEXT SCREEN</h1>
			<form onSubmit={handleSubmit} className={classes.root}>
				<TextField
					id="foreignText"
					name="foreignText"
					label="Paste foreign language text"
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

			<div>
				{renderedText.map((paragraphArray, i) => {
					return <Paragraph key={i} paragraphArray={paragraphArray} updateModalText={updateModalText} />;
				})}
			</div>

			<VocabForm
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				wordText={modalText}
				setting="variation"
			/>
		</div>
	);
}
