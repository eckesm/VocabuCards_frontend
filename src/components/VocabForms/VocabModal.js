import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import VocabComponentForm from './VocabComponentForm';
import VocabWordForm from './VocabWordForm';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top       : `${top}%`,
		left      : `${left}%`,
		transform : `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles(theme => ({
	paper : {
		position                       : 'absolute',
		width                          : 400,
		backgroundColor                : theme.palette.background.paper,
		border                         : '2px solid #000',
		boxShadow                      : theme.shadows[5],
		padding                        : theme.spacing(2, 4, 3),
		overflow                       : 'auto',
		[theme.breakpoints.down('sm')]: {
			maxHeight : '100%',
			width     : '100%'
		},
		[theme.breakpoints.up('md')]: {
			maxHeight : '90%'
		},
		[theme.breakpoints.up('lg')]: {
			maxHeight : '80%'
		}
	}
}));

export default function VocabModal({
	open,
	handleClose,
	wordText = null,
	variation = null,
	setVariation,
	word = null,
	setWord,
	setting,
	rootId = null,
	rootWord = null
}) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [ modalStyle ] = React.useState(getModalStyle);

	const body = (
		<div style={modalStyle} className={classes.paper}>
			{(setting === 'edit_variation' || setting === 'edit_saved_variation') && (
				<VocabComponentForm
					onClose={handleClose}
					wordText={wordText}
					variation={variation}
					setVariation={setVariation}
					setting={setting}
				/>
			)}
			{setting === 'add_variation_or_root' && (
				<VocabComponentForm onClose={handleClose} wordText={wordText} setting={setting} />
			)}
			{setting === 'add_variation_of_root' && (
				<VocabComponentForm onClose={handleClose} rootId={rootId} rootWord={rootWord} setting={setting} />
			)}
			{setting === 'edit_root' && <VocabWordForm onClose={handleClose} word={word} setWord={setWord} />}
		</div>
	);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
