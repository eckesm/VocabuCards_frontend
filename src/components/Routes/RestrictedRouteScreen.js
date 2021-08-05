import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

// import LoginForm from '../Login/LoginForm';
import StripeScreen from '../Stripe/StripeScreen';
// import AlertsContainer from '../Alerts/AlertsContainer';
// import ProductChoices from '../Stripe/ProductChoices';

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

export default function RestrictedRouteScreen() {
	const classes = useStyles();
	const [ alerts, setAlerts ] = useState([]);

	return (
		<StripeScreen status="expired" />
		// <div>
		// 	<AlertsContainer alerts={alerts} />
		// 	<div className={classes.container}>
		// 		<h4>
		// 			<i>You must have an active account to access this page.</i>
		// 		</h4>
		// 		<ProductChoices setAlerts={setAlerts} />
		// 	</div>
		// </div>
	);
}
