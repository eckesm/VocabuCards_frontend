import React from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { makeStyles } from '@material-ui/core/styles';

import ProductChoice from './ProductChoice';

// const useStyles = makeStyles(theme => ({
// 	root : {
// 		display       : 'flex',
// 		flexDirection : 'column',
// 		alignItems    : 'center',
// 		'& > *'       : {
// 			margin : theme.spacing(1)
// 		}
// 	}
// }));

export default function ProductChoices({ selectPlan = null, current_plan = null }) {
	// const classes = useStyles();

	// console.log(current_plan)

	const plansArray = [
		{ title: 'Weekly Plan', code: 'weekly', price: 1.99, message: '$1.99 charged weekly.' },
		{ title: 'Monthly Plan', code: 'monthly', price: 4.99, message: '$4.99 charged monthly.' },
		{ title: 'Annual Plan', code: 'annually', price: 49.99, message: '$49.99 charged annually.' }
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
