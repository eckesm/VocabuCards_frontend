import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import Checkout from './Checkout';
import AlertsContainer from '../Alerts/AlertsContainer';
import CustomButton from '../CustomButton';
import ProductChoices from './ProductChoices';

import { createStripeBillingPortalSession } from '../../helpers/API';
import { clearAlerts } from '../../actions/auth';
import {
	stripeCurrentAlert,
	stripeSuccessAlert,
	stripeExpiringAlert,
	stripeNoPaymentAlert,
	stripeExpiredAlert
} from '../../helpers/Stripe';

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
	},
	button    : {
		marginTop : '15px'
	},
	message   : {
		marginTop  : '100px',
		fontFamily : 'roboto, sans-serif',
		fontWeight : 'bold'
	}
}));

export default function StripeScreen({ status = null, message = null }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [ alerts, setAlerts ] = useState([]);

	const {
		stripe_customer_id,
		current_plan,
		subscription_status,
		stripe_period_end,
		stripe_payment_method
	} = useSelector(store => store);
	// const { stripe_customer_id } = useSelector(store => store);
	// const current_plan = null;

	async function handleBillingPortal(evt) {
		evt.preventDefault();
		const res = await createStripeBillingPortalSession(stripe_customer_id);
		try {
			const url = res.url;
			window.location.href = url;
		} catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		if (status === 'success') {
			dispatch(clearAlerts());
			setAlerts([ stripeSuccessAlert(current_plan, stripe_period_end, false) ]);
		}
		if (status === 'expired') {
			dispatch(clearAlerts());
			setAlerts([ stripeExpiredAlert(current_plan, stripe_period_end, false) ]);
		}
		if (status === 'updated') {
			dispatch(clearAlerts());
			if (!stripe_payment_method) {
				setAlerts([ stripeNoPaymentAlert(current_plan, stripe_period_end, false) ]);
			}
			else if (subscription_status === 'expiring') {
				setAlerts([ stripeExpiringAlert(current_plan, stripe_period_end, false) ]);
			}
			else {
				setAlerts([ stripeCurrentAlert(current_plan, stripe_period_end, false) ]);
			}
		}
	}, []);

	const backgroundImageUrl =
		'https://images.unsplash.com/photo-1596779845727-d88eb78a1b08?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2091&q=80';

	return (
		// <div className={classes.screen} style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
		<div className={classes.screen}>
			<AlertsContainer alerts={alerts} />
			{/* <h1 className={classes.message}>{message}</h1> */}

			{current_plan ? (
				<div className={classes.container}>
					{message && (
						<h4>
							<i>{message}</i>
						</h4>
					)}
					<ProductChoices current_plan={current_plan} />
					<form className={classes.button} onSubmit={handleBillingPortal}>
						<CustomButton type="submit">Manage Billing</CustomButton>
					</form>
				</div>
			) : (
				<div className={classes.container}>
					<Checkout setAlerts={setAlerts} />
				</div>
			)}
		</div>
	);
}
