import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container : {
		margin          : '0 auto',
		marginTop       : '150px',
		width           : '300px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '40px',
		backgroundColor : 'snow',
		borderRadius    : '3px',
		boxShadow       : '5px 5px 8px grey'
	}
}));

export default function ErrorScreen() {
	const classes = useStyles();

	return (
		<div>
			<div className={classes.container}>
				<h1>Eek! An error has occurred! It may be necessary to refresh the page.</h1>
			</div>
		</div>
	);
}
