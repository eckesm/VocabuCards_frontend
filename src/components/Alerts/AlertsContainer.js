import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import SingleAlert from './SingleAlert';

const useStyles = makeStyles(theme => ({
	alerts : {
		marginTop : '60px'
	}
}));

export default function AlertsContainer({ alerts }) {
	const classes = useStyles();

	return (
		<div className={classes.alerts}>
			{alerts.length > 0 &&
				alerts.map((alert, i) => {
					return <SingleAlert key={i} type={alert.type} title={alert.title} text={alert.text} />;
				})}
		</div>
	);
}
