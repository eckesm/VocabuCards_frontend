import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';

import NewPasswordForm from './NewPasswordForm';
import AlertsContainer from '../Alerts/AlertsContainer';
import LoginForm from '../Login/LoginForm';

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

export default function NewPasswordScreen() {
	const classes = useStyles();
	const { alerts } = useSelector(store => store);
	const { token } = useParams();
	// const [ alerts, setAlerts ] = useState([]);
	const [ showForm, setShowForm ] = useState(true);

	const backgroundImageUrl =
		'https://images.unsplash.com/photo-1596779845727-d88eb78a1b08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2091&q=80';

	return (
		<div className={classes.screen} style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
			<AlertsContainer alerts={alerts} />
			<div className={classes.container}>
				{showForm && <NewPasswordForm token={token} setShowForm={setShowForm} />}
				{!showForm && (
					<div>
						<h4>
							<i>Please log in again.</i>
						</h4>
						{/* <LoginForm setAlerts={setAlerts} /> */}
						<LoginForm />
					</div>
				)}
			</div>
		</div>
	);
}
