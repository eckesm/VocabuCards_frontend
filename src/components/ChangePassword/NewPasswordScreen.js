import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import NewPasswordForm from './NewPasswordForm';
import AlertsContainer from '../Alerts/AlertsContainer';
import LoginForm from '../Login/LoginForm';

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

export default function NewPasswordScreen() {
	const classes = useStyles();
	const { token } = useParams();
	const [ alerts, setAlerts ] = useState([]);
	const [ showForm, setShowForm ] = useState(true);

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.container}>
				{showForm && <NewPasswordForm token={token} setAlerts={setAlerts} setShowForm={setShowForm} />}
				{!showForm && (
					<div>
						<h4>
							<i>Please log in again.</i>
						</h4>
						<LoginForm setAlerts={setAlerts} />
					</div>
				)}
			</div>
		</div>
	);
}
