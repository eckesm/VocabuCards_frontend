import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import LoginForm from './LoginForm';
import AlertsContainer from '../Alerts/AlertsContainer';

const useStyles = makeStyles(theme => ({
	formContainer : {
		marginTop : '125px'
	}
}));

export default function LoginScreen() {
	const classes = useStyles();
	const [ alerts, setAlerts ] = useState([]);

	function addAlert(alertObj) {
		setAlerts([ ...alerts, alertObj ]);
	}

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.formContainer}>
				<LoginForm addAlert={addAlert} />
			</div>
		</div>
	);
}
