import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import VocabComponentForm from '../VocabForms/VocabComponentForm';
import './RenderedText.css';

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
		overflow        : 'scroll',
		height          : '90%',
		// width:'80%',
		display         : 'block'
	}
}));

// export default function VocabComponentFormModal({ buttonText = 'Open Modal', wordClassName }) {
export default function VocabComponentFormModal({ wordText }) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [ modalStyle ] = React.useState(getModalStyle);
	// const [ open, setOpen ] = React.useState(false);
	const [ open, setOpen ] = React.useState(true);

	// const handleOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			{/* <h2 id="simple-modal-title">Text in a modal</h2>
      <p id="simple-modal-description">
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </p> */}
			{/* <FormModal /> */}

			<VocabComponentForm wordText={wordText} />
		</div>
	);

	return (
		<div>
			{/* <button type="button" onClick={handleOpen}> */}
			{/* Open Modal */}
			{/* {buttonText} */}
			{/* </button> */}

			{/* <span className={wordClassName} onClick={handleOpen}>
				{buttonText}
			</span> */}

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
