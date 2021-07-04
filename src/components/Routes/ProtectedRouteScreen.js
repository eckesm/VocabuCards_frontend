import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import LoginForm from '../Login/LoginForm';

const useStyles = makeStyles(theme => ({
	container : {
		margin          : '0 auto',
		marginTop       : '100px',
		// width           : '300px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '10px',
		backgroundColor : 'snow',
		borderRadius    : '3px',
		boxShadow       : '5px 5px 8px grey'
	}
}));

export default function ProtectedRouteScreen() {
	const classes = useStyles();

	return (
		<div>
			<h1 className={classes.container}>You must be logged in to access this page.</h1>
			<LoginForm />
		</div>
	);
}
