import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import ConfirmEmailForm from './ConfirmEmailForm';
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
	},
	button    : {
		marginTop : '15px'
	}
}));

export default function ConfirmEmailScreen() {
	const classes = useStyles();
	const history = useHistory();
	const { token } = useParams();
	const [ alerts, setAlerts ] = useState([]);
	const [ showForm, setShowForm ] = useState(true);

	function addAlert(alertObj) {
		setAlerts([ ...alerts, alertObj ]);
	}

	return (
		<div>
			<AlertsContainer alerts={alerts} />
			<div className={classes.container}>
				{showForm && <ConfirmEmailForm token={token} addAlert={addAlert} setShowForm={setShowForm} />}
				{!showForm && (
					<div>
						<h1>Your email address has been confirmed.</h1>
						<Button
							variant="contained"
							color="primary"
							className={classes.button}
							onClick={() => history.push('/words')}
						>
							Go to Words
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
