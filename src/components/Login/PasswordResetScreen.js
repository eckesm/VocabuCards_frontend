import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PasswordResetForm from './PasswordResetForm';
import AlertsContainer from '../Alerts/AlertsContainer';

const useStyles = makeStyles(theme => ({
	formContainer : {
		marginTop : '125px'
	}
}));

export default function PasswordResetScreen() {
	const classes = useStyles();
	const [ alerts, setAlerts ] = useState([]);
	const [ showForm, setShowForm ] = useState(true);

	function addAlert(alertObj) {
		setAlerts([ ...alerts, alertObj ]);
	}

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.formContainer}>
				{showForm && <PasswordResetForm addAlert={addAlert} setShowForm={setShowForm} />}
				{!showForm && <h1>Email sent!</h1>}
			</div>
		</div>
	);
}
