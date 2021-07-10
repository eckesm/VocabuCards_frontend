import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SignUpForm from './SignUpForm';
import AlertsContainer from '../Alerts/AlertsContainer';

const useStyles = makeStyles(theme => ({
	container : {
		marginTop       : '100px',
		margin          : '0 auto',
		width           : '300px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '40px',
		backgroundColor : 'snow',
		borderRadius    : '3px',
		boxShadow       : '5px 5px 8px grey'
	}
}));

export default function SignUpScreen() {
	const classes = useStyles();
	const [ alerts, setAlerts ] = useState([]);

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.container}>
				<SignUpForm setAlerts={setAlerts} />
			</div>
		</div>
	);
}