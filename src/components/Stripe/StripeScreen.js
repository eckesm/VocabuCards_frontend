import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import Checkout from './Checkout';
import AlertsContainer from '../Alerts/AlertsContainer';
import CustomButton from '../CustomButton';
import ProductChoices from './ProductChoices';

import { createStripeBillingPortalSession } from '../../helpers/API';
import { clearAlerts, addAlert } from '../../actions/auth';
import {
	stripeCurrentAlert,
	stripeSuccessAlert,
	stripeExpiringAlert,
	stripeNoPaymentAlert,
	stripeExpiredAlert
} from '../../helpers/Stripe';

import { SCREEN_STRIPE_MOBILE, SCREEN_STRIPE_DESKTOP } from '../../settings';

const useStyles = makeStyles(theme => ({
	screen    : {
		height                         : '100vh',
		backgroundRepeat               : 'no-repeat',
		backgroundSize                 : 'cover',
		[theme.breakpoints.down('xs')]: {
			backgroundImage : `url(${SCREEN_STRIPE_MOBILE})`
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage : `url(${SCREEN_STRIPE_DESKTOP})`
		}
	},
	container : {
		margin                         : '0 auto',
		width                          : '300px',
		fontFamily                     : 'roboto, sans-serif',
		border                         : '1px solid rgb(200, 200, 200)',
		padding                        : '40px',
		backgroundColor                : 'snow',
		borderRadius                   : '3px',
		[theme.breakpoints.down('xs')]: {
			marginTop : '100px'
		},
		[theme.breakpoints.up('sm')]: {
			marginTop : '75px',
			boxShadow : '5px 5px 10px black'
		}
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
	const history = useHistory();
	const {
		stripe_customer_id,
		current_plan,
		subscription_status,
		stripe_period_end,
		stripe_payment_method
	} = useSelector(store => store);

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
		dispatch(clearAlerts());

		if (subscription_status === 'expired') {
			dispatch(addAlert(stripeExpiredAlert(current_plan, stripe_period_end, false)));
		}
		else {
			if (status === 'success') {
				// dispatch(clearAlerts());
				dispatch(addAlert(stripeSuccessAlert(current_plan, stripe_period_end, false)));
			}
			// if (status === 'expired') {
			// 	dispatch(addAlert(stripeExpiredAlert(current_plan, stripe_period_end, false)));
			// }
			if (status === 'updated') {
				// dispatch(clearAlerts());
				if (!stripe_payment_method) {
					dispatch(addAlert(stripeNoPaymentAlert(current_plan, stripe_period_end, false)));
				}
				else if (subscription_status === 'expiring') {
					dispatch(addAlert(stripeExpiringAlert(current_plan, stripe_period_end, false)));
				}
				else {
					dispatch(addAlert(stripeCurrentAlert(current_plan, stripe_period_end, false)));
				}
			}
		}

		history.push('/plans');
	}, []);

	return (
		<div className={classes.screen}>
			<NavBar />
			<AlertsContainer />
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
					<Checkout />
				</div>
			)}
		</div>
	);
}
