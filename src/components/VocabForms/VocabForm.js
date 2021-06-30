import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

import VocabComponentForm from './VocabComponentForm';

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
		position        : 'absolute',
		width           : 400,
		backgroundColor : theme.palette.background.paper,
		border          : '2px solid #000',
		boxShadow       : theme.shadows[5],
		padding         : theme.spacing(2, 4, 3),
		overflow        : 'auto',
		maxHeight: '90%'
	}
}));

export default function VocabForm({ open, handleOpen, handleClose, wordText }) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [ modalStyle ] = React.useState(getModalStyle);

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<VocabComponentForm wordText={wordText} onClose={handleClose} />
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
