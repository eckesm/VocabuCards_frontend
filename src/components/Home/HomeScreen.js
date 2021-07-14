import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Home from './Home';

const useStyles = makeStyles(theme => ({
	container : {
		margin          : '0 auto',
		marginTop       : '100px',
		width           : '300px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '40px',
		backgroundColor : 'snow',
		borderRadius    : '3px',
		boxShadow       : '5px 5px 8px grey'
	}
}));

export default function HomeScreen() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<h1>Welcome to VocabuCards!</h1>
			<Home />
		</div>
	);
}
