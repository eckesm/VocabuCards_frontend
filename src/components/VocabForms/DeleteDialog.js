import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	button : {
		height : '35px',
        width:'35px'
	}
}));

export default function DeleteDialog({ root = null, variation = null, variations = null, handleDelete }) {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirm = () => {
		handleDelete();
		handleClose();
	};

	const variationsText = () => {
		if (variations === null) {
			return '';
		}
		else {
			if (variations.length === 0) {
				return '';
			}
			if (variations.length === 1) {
				return " and it's 1 variation";
			}
			return ` and it's ${variations.length} variations`;
		}
	};

	const wordText = variation ? variation : root;
	const wordType = variation ? `variation` : 'vocabulary root word';

	return (
		<div>
			{variation && (
				// <div>
					<IconButton className={classes.button} color="secondary" onClick={handleClickOpen} size="small">
						<i className="fad fa-trash-alt" />
					</IconButton>
				// </div>
			)}
			{variation === null && (
				<Button color="secondary" onClick={handleClickOpen} startIcon={<i className="fad fa-trash-alt" />}>
					Delete
				</Button>
			)}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle id="alert-dialog-title">
					Delete <b>{wordText}</b>?
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="alert-dialog-description">
						Are you sure you would like to delete the {wordType} {<b>{wordText}</b>}
						{variationsText()}?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleConfirm} color="secondary" autoFocus>
						Delete
					</Button>
					<Button onClick={handleClose} color="default">
						Close
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
