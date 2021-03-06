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
		text    : `The ${current_plan.toUpperCase()} plan is currently active, but your subscription is expiring on ${dateVal}.  Go to the "Subscriptions" page and click the "Manage Billing" button to add a payment method and to make changes to your Stripe plan.`,
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

export function stripeRenewingSoonAlert(current_plan, stripe_period_end, closeMs = false) {
	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'info',
		title   : `${current_plan.toUpperCase()} Plan Renewing Soon`,
		text    : `You are subscribed to the ${current_plan.toUpperCase()} plan.  The plan will renew on ${dateVal}.  If you would like to make changes to your subscription before it renews, go to the "Subscriptions" page and click the "Manage Billing" button.`,
		closeMs : closeMs
	};
}

export function stripeExpiredAlert(current_plan, stripe_period_end, closeMs = false) {
	// const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'error',
		title   : `Plan Expired`,
		text    : `You do not have an active account.  Go to the "Subscriptions" page and click the "Manage Billing" button to reactivate your account.`,
		closeMs : closeMs
	};
}

export function restrictedExpiredAlert(current_plan, stripe_period_end, closeMs = false) {
	// const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'error',
		title   : `Plan Expired`,
		text    : 'You must have an active account to access this page.',
		closeMs : closeMs
	};
}

export function stripeTrialAlert(current_plan, stripe_period_end, closeMs = false) {
	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'info',
		title   : 'Free Trial',
		// text    : `You are using a free trial that will convert to a paid ${current_plan.toUpperCase()} plan on ${dateVal}.`,
		text    : `You are using a free trial that will end on ${dateVal}.  Go to the "Subscriptions" page and click the "Manage Billing" button to add a payment method and to make changes to your Stripe plan.`,
		closeMs : closeMs
	};
}

// export function stripeNoPaymentAlert(current_plan, stripe_period_end, closeMs = false) {
// 	const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
// 	return {
// 		type    : 'warning',
// 		title   : 'No Payment Method',
// 		text    : `There is no payment method associated with your Stripe subscription.  If you do not add a payment method, access to your account will expire on ${dateVal}.  Go to the "Subscriptions" page to add a payment method and to make changes to your Stripe plan.`,
// 		closeMs : closeMs
// 	};
// }

export function stripePastDueAlert(current_plan, stripe_period_end, closeMs = false) {
	// const dateVal = new Date(stripe_period_end * 1000).toLocaleDateString('en-US');
	return {
		type    : 'error',
		title   : 'Account Past Due',
		text    : `Your ${current_plan.toUpperCase()} plan is past due.  Go to the "Subscriptions" page and click the "Manage Billing" button to add a payment method and to make changes to your Stripe plan.`,
		closeMs : closeMs
	};
}
