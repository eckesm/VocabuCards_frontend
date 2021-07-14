import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import ConfirmEmailForm from './ConfirmEmailForm';
import AlertsContainer from '../Alerts/AlertsContainer';
import Home from '../Home/Home';

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
	},
	button    : {
		marginTop : '15px'
	}
}));

export default function ConfirmEmailScreen() {
	const classes = useStyles();
	const { token } = useParams();
	const [ alerts, setAlerts ] = useState([]);
	const [ showForm, setShowForm ] = useState(true);

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.container}>
				{showForm && <ConfirmEmailForm token={token} setAlerts={setAlerts} setShowForm={setShowForm} />}
				{!showForm && (
					<div>
						<h1>Your email address has been confirmed.</h1>
						<Home />
					</div>
				)}
			</div>
		</div>
	);
}
