import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Home from './Home';
import AlertsContainer from '../Alerts/AlertsContainer';

const useStyles = makeStyles(theme => ({
	screen    : {
		margin     : '0px',
		height     : '100vh',
		marginTop  : '-10px',
		paddingTop : '15px'
	},
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
	const { alerts } = useSelector(store => store);

	const backgroundImageUrl =
		'https://images.unsplash.com/photo-1596779845727-d88eb78a1b08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2091&q=80';

	return (
		<div className={classes.screen} style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
			<AlertsContainer alerts={alerts} />
			<div className={classes.container}>
				<h1>Welcome to VocabuCards!</h1>
				<Home />
			</div>
		</div>
	);
}
