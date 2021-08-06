import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import { createStripeCheckoutSession } from '../../helpers/API';

import CustomButton from '../CustomButton';
import ProductChoices from './ProductChoices';

const STRIPE_WEEKLY_PLAN_PRICE_ID = process.env.REACT_APP_STRIPE_WEEKLY_PLAN_PRICE_ID;
const STRIPE_MONTHLY_PLAN_PRICE_ID = process.env.REACT_APP_STRIPE_MONTHLY_PLAN_PRICE_ID;
const STRIPE_ANNUALLY_PLAN_PRICE_ID = process.env.REACT_APP_STRIPE_ANNUALLY_PLAN_PRICE_ID;

export default function Checkout() {
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
