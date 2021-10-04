import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import ProductChoice from './ProductChoice';

export default function ProductChoices({ selectPlan = null, current_plan = null }) {
	const plansArray = [
		// { title: 'Weekly Plan', code: 'weekly', price: 0.99, message: '$0.99 charged weekly.' },
		{ title: 'Monthly Plan', code: 'monthly', price: 2.99, message: '$2.99 charged monthly.' },
		// { title: 'Annual Plan', code: 'annually', price: 29.99, message: '$29.99 charged annually.' }
	];

	return (
		<div>
			{selectPlan ? (
				<ButtonGroup variant="text" color="primary" aria-label="text primary button group">
					{plansArray.map(plan => {
						return (
							<Button key={plan.code} onClick={() => selectPlan(plan.code)}>
								{plan.code}
							</Button>
						);
					})}
				</ButtonGroup>
			) : (
				<div>
					{plansArray.map(plan => {
						if (current_plan === plan.code) {
							return <ProductChoice key={plan.code} planObject={plan} selected={false} />;
						}
						else {
							return <ProductChoice key={plan.code} planObject={plan} selected={true} />;
						}
					})}
				</div>
			)}
		</div>
	);
}
