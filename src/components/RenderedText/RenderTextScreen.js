import React, { useState } from 'react';
import { renderHtml } from '../../helpers/helpers';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { v4 as uuid } from 'uuid';
import Paragraph from './Paragraph';
import VocabComponentFormModal from '../VocabForms/VocabComponentFormModal';
import TestModal from '../VocabForms/TestModal';

const useStyles = makeStyles(theme => ({
	root : {
		'& > *' : {
			margin : theme.spacing(1),
			// width: '25ch',
			width  : '90%'
		}
	}
}));

export default function RenderTextScreen() {
	const [ formData, setFormData ] = useState({
		foreignText : ''
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
		let prepareRenderedText = renderHtml(formData.foreignText, source_code, translate_code);
		setRenderedText(prepareRenderedText);
	}

	function updateModalText(wordObject) {
		setModalText(wordObject.text);
		setOpen(true);
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
		<div>
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
				<Button variant="outlined" type="submit" color="primary">
					Render
				</Button>
			</form>

			<div>
				{renderedText.map((paragraphArray, i) => {
					return <Paragraph key={i} paragraphArray={paragraphArray} updateModalText={updateModalText} />;
				})}
			</div>

			{/* {modals.map(modal => {
				return <VocabComponentFormModal key={uuid()} wordText={modal.text} />;
			})} */}

			<TestModal open={open} handleOpen={handleOpen} handleClose={handleClose} wordText={modalText} />
		</div>
	);
}
