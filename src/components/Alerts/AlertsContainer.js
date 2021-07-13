import React from 'react';
import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';

import SingleAlert from './SingleAlert';

const useStyles = makeStyles(theme => ({
	alerts : {
		// marginTop : '60px',
		paddingLeft  : '5px',
		paddingRight : '5px'
	}
}));

export default function AlertsContainer({ alerts }) {
	const classes = useStyles();

	return (
		<div className={classes.alerts}>
			{alerts.length > 0 &&
				alerts.map(alert => {
					const id = alert.id ? alert.id : uuid();
					return (
						<SingleAlert
							key={id}
							id={id}
							type={alert.type}
							title={alert.title}
							text={alert.text}
							closeMs={alert.closeMs || null}
						/>
					);
				})}
		</div>
	);
}
