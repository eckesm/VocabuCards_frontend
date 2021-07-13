import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { logoutUser, logoutUserViaAPI } from '../../actions/auth';
import { addAlert } from '../../actions/auth';
import { makeStyles } from '@material-ui/core/styles';

import { DEFAULT_ALERT_CLOSE_MS } from '../../settings';

const useStyles = makeStyles(theme => ({
	container : {
		margin          : '0 auto',
		marginTop       : '150px',
		width           : '300px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '40px',
		backgroundColor : 'snow',
		borderRadius    : '3px',
		boxShadow       : '5px 5px 8px grey'
	}
}));

export default function Logout() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	async function handleLogout() {
		const res = await dispatch(logoutUserViaAPI());
		dispatch(logoutUser());
		try {
			dispatch(
				addAlert({
					type    : res.status,
					title   : res.title,
					text    : res.message,
					closeMs : DEFAULT_ALERT_CLOSE_MS
				})
			);
		} catch (e) {
			console.log(e);
			dispatch(
				addAlert({
					type  : 'success',
					title : 'Logged Out!',
					text  :
						'There was an error logging you out via API (perhaps you have a poor netwoek connection) but you have been logged out of the browser.'
				})
			);
		}
		history.push('/login');
	}

	useEffect(() => {
		handleLogout();
	}, []);

	return (
		<div className={classes.container}>
			<h1>You are being logged out.</h1>
		</div>
	);
}
