import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import PasswordResetForm from './PasswordResetForm';
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

export default function PasswordResetScreen() {
	const classes = useStyles();
	const [ alerts, setAlerts ] = useState([]);
	const [ showForm, setShowForm ] = useState(true);

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.container}>
				{showForm && <PasswordResetForm setAlerts={setAlerts} setShowForm={setShowForm} />}
				{!showForm && <h1>Email sent.</h1>}
			</div>
		</div>
	);
}
