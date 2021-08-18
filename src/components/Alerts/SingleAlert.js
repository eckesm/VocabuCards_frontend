import React, { useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import { removeAlert } from '../../actions/auth';

const useStyles = makeStyles(theme => ({
	root : {
		width       : '100%',
		'& > * + *' : {
			marginTop : theme.spacing(2)
		},
		marginTop   : '5px',
		textAlign   : 'left'
	}
}));

// types: error, warning, info, success

export default function SingleAlert({ id, type = 'info', title, text, closeMs = null }) {
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(true);

	useEffect(() => {
		if (closeMs) {
			const timer = setTimeout(() => {
				setOpen(false);
			}, closeMs);
			return () => {
				removeAlert(id);
				clearTimeout(timer);
			};
		}
	}, []);

	return (
		<Collapse in={open}>
			<div className={classes.root}>
				<Alert
					variant="filled"
					severity={type}
					action={
						<IconButton
							aria-label="close"
							color="inherit"
							size="small"
							onClick={() => {
								setOpen(false);
							}}
						>
							<CloseIcon fontSize="inherit" />
						</IconButton>
					}
				>
					{title && <AlertTitle>{title}</AlertTitle>}
					{text}
				</Alert>
			</div>
		</Collapse>
	);
}
