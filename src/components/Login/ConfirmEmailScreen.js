import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import ConfirmEmailForm from './ConfirmEmailForm';
import AlertsContainer from '../Alerts/AlertsContainer';

const useStyles = makeStyles(theme => ({
	formContainer : {
		marginTop : '125px'
	}
}));

export default function ConfirmEmailScreen() {
	const classes = useStyles();
	const { token } = useParams();
	const [ alerts, setAlerts ] = useState([]);

	function addAlert(alertObj) {
		setAlerts([ ...alerts, alertObj ]);
	}

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.formContainer}>
				<ConfirmEmailForm token={token} addAlert={addAlert} />
			</div>
		</div>
	);
}
