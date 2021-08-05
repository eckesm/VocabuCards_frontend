export function stripeSuccessAlert(current_plan, stripe_period_end, closeMs = true) {
	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'success',
		title   : 'Subscribed Successfully!',
		text    : `You have successfully subscribed to the ${current_plan.toUpperCase()} plan.  The plan will renew on ${dateVal}.`,
		closeMs : closeMs
	};
}

export function stripeExpiringAlert(current_plan, stripe_period_end, closeMs = false) {
	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'warning',
		title   : 'Plan Expiring',
		text    : `The ${current_plan.toUpperCase()} plan is currently active, but your subscription is expiring on ${dateVal}.`,
		closeMs : closeMs
	};
}

export function stripeCurrentAlert(current_plan, stripe_period_end, closeMs = false) {
	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'info',
		title   : `${current_plan.toUpperCase()} Plan Active`,
		text    : `You are subscribed to the ${current_plan.toUpperCase()} plan.  The plan will renew on ${dateVal}.`,
		closeMs : closeMs
	};
}

export function stripeExpiredAlert(current_plan, stripe_period_end, closeMs = false) {
	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'error',
		title   : `${current_plan.toUpperCase()} Expired`,
		text    : 'You must have an active account to access this page.',
		closeMs : closeMs
	};
}

export function stripeTrialAlert(current_plan, stripe_period_end, closeMs = false) {
	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'info',
		title   : 'Free Trial',
		text    : `You are using a free trial that will convert to a paid ${current_plan.toUpperCase()} plan on ${dateVal}.`,
		closeMs : closeMs
	};
}

export function stripeNoPaymentAlert(current_plan, stripe_period_end, closeMs = false) {
	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'warning',
		title   : 'No Payment Method',
		text    : `There is no payment method associated with your subscription.  If you do not add a payment method, access to your account will expire on ${dateVal}.  Go to the Subscriptions page to add a payment method and to make changes to your plan.`,
		closeMs : closeMs
	};
}
