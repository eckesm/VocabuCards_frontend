import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { logoutUser, logoutUserViaAPI } from '../../actions/auth';
import { addAlert } from '../../actions/auth';
import { getAccessToken } from '../../helpers/API';
import { makeStyles } from '@material-ui/core/styles';

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
		const access_token = getAccessToken();
		dispatch(logoutUser());
		const res = await dispatch(logoutUserViaAPI(access_token));
		
		try {
			if (res.status === 'success') {
				dispatch(
					addAlert({
						type  : 'success',
						title : 'Logged out!',
						text  : res.message
					})
				);
			}
			else {
				dispatch(
					addAlert({
						type  : 'error',
						title : 'Error!',
						text  : 'There was an error logging you out.'
					})
				);
			}
		} catch (e) {
			history.push('/error');
		}
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
