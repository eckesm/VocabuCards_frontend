import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { TextField, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { createStripeCheckoutSession } from '../../helpers/API';
import { clearAlerts, addAlert, loginUserViaAPI } from '../../actions/auth';
import useFields from '../../hooks/useFields';
import { DEFAULT_ALERT_CLOSE_MS } from '../../settings';

import CustomButton from '../CustomButton';
import ProductChoices from './ProductChoices';

const STRIPE_WEEKLY_PLAN_PRICE_ID = process.env.REACT_APP_STRIPE_WEEKLY_PLAN_PRICE_ID;
const STRIPE_MONTHLY_PLAN_PRICE_ID = process.env.REACT_APP_STRIPE_MONTHLY_PLAN_PRICE_ID;
const STRIPE_ANNUALLY_PLAN_PRICE_ID = process.env.REACT_APP_STRIPE_ANNUALLY_PLAN_PRICE_ID;

const useStyles = makeStyles(theme => ({
	textInput     : {
		marginBottom : '10px',
		width        : '250px'
	},
	button        : {
		marginTop : '15px'
	},
	link          : {
		marginTop    : '5px',
		marginBottom : '5px'
	},
	linkContainer : {
		marginTop : '25px'
	}
}));

export default function Checkout({ setAlerts }) {
	const classes = useStyles();
	const [ priceId, setPriceId ] = useState(null);
	const [ planName, setPlanName ] = useState('Select a Plan...');

	const { stripe_customer_id } = useSelector(store => store);

	function selectPlan(plan = null) {
		if (plan === 'weekly') {
			setPriceId(STRIPE_WEEKLY_PLAN_PRICE_ID);
			setPlanName('WEEKLY plan selected');
		}
		else if (plan === 'monthly') {
			setPriceId(STRIPE_MONTHLY_PLAN_PRICE_ID);
			setPlanName('MONTHLY plan selected');
		}
		else if (plan === 'annually') {
			setPriceId(STRIPE_ANNUALLY_PLAN_PRICE_ID);
			setPlanName('ANNUAL plan selected');
		}
		else {
			setPriceId(null);
			setPlanName('Select a Plan...');
		}
	}

	async function handleSubmit(evt) {
		evt.preventDefault();
		const res = await createStripeCheckoutSession(priceId, stripe_customer_id);
		console.log(res);
		try {
			const url = res.url;
			window.location.href = url;
		} catch (e) {
			console.log(e);
		}
	}

	return (
		<div>
			<h1>{planName}</h1>
			<form onSubmit={handleSubmit}>
				<ProductChoices selectPlan={selectPlan} />
				<CustomButton type="submit" style={{ marginTop: '20px' }} disabled={priceId === null}>
					Subscribe & Pay
				</CustomButton>
			</form>
		</div>
	);
}
