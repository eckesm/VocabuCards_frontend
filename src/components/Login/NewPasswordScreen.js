import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import NewPasswordForm from './NewPasswordForm';
import AlertsContainer from '../Alerts/AlertsContainer';
import LoginForm from './LoginForm';

const useStyles = makeStyles(theme => ({
	formContainer : {
		marginTop : '125px'
	}
}));

export default function NewPasswordScreen() {
	const classes = useStyles();
	const { token } = useParams();
	const [ alerts, setAlerts ] = useState([]);
	const [ showForm, setShowForm ] = useState(true);

	function addAlert(alertObj) {
		setAlerts([ ...alerts, alertObj ]);
	}

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.formContainer}>
				{showForm && <NewPasswordForm token={token} addAlert={addAlert} setShowForm={setShowForm} />}
				{!showForm && <LoginForm addAlert={addAlert} />}
			</div>
		</div>
	);
}
