import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { confirmEmailViaAPI } from '../../helpers/API';
import useFields from '../../hooks/useFields';
import { clearAlerts, addAlert, logoutUser, logoutUserViaAPI } from '../../actions/auth';

const useStyles = makeStyles(theme => ({
	textInput : {
		marginBottom : '10px',
		width        : '250px'
	},
	button    : {
		marginTop : '15px'
	}
}));

export default function ConfirmEmailForm({ token, setShowForm, setAuthEmailAddress }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const { user } = useSelector(store => store);

	const [ formData, handleChange ] = useFields({
		password : ''
	});
	const [ loading, setLoading ] = useState(false);

	async function handleSubmit(evt) {
		evt.preventDefault();
		setLoading(true);

		const res = await confirmEmailViaAPI(token, formData.password);
		dispatch(clearAlerts());

		try {
			if (res.status === 'success') {
				setAuthEmailAddress(res.email_address);
				setShowForm(false);
			}
			dispatch(
				addAlert({
					type    : res.status,
					title   : res.title,
					text    : res.message,
					closeMs : true
				})
			);
		} catch (e) {
			history.push('/error');
		}

		setLoading(false);
	}

	useEffect(
		() => {
			if (user) {
				dispatch(clearAlerts());
				dispatch(logoutUser());
				dispatch(logoutUserViaAPI());
			}
		},
		[ user ]
	);

	return (
		<div>
			<h1>Confirm Email</h1>
			<p>Enter you password to confirm your email address.</p>
			<form onSubmit={handleSubmit}>
				<TextField
					id="password"
					name="password"
					label="Password"
					className={classes.textInput}
					onChange={handleChange}
					value={formData.password}
					type="password"
					required
				/>
				<Button
					variant="contained"
					type="submit"
					color="primary"
					className={classes.button}
					disabled={loading ? true : false}
				>
					{loading ? 'Loading' : 'Confirm Email Address'}
				</Button>
			</form>
		</div>
	);
}
