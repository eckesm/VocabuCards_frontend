import React from 'react';
import { useHistory } from 'react-router';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { sendPasswordResetViaAPI } from '../../helpers/API';
import useFields from '../../hooks/useFields';
import { DEFAULT_ALERT_CLOSE_MS } from '../../settings';

const useStyles = makeStyles(theme => ({
	textInput : {
		marginBottom : '10px',
		width        : '250px'
	},
	button    : {
		marginTop : '15px'
	}
}));

export default function PasswordResetForm({ setAlerts, setShowForm }) {
	const classes = useStyles();
	const history = useHistory();

	const [ formData, handleChange ] = useFields({
		emailAddress : ''
	});

	async function handleSubmit(evt) {
		evt.preventDefault();
		const res = await sendPasswordResetViaAPI(formData.emailAddress);
		setAlerts([]);

		try {
			if (res.status === 'success') {
				setShowForm(false);
			}
			setAlerts([
				{
					type    : res.status,
					title   : res.title,
					text    : res.message,
					closeMs : DEFAULT_ALERT_CLOSE_MS
				}
			]);
		} catch (e) {
			history.push('/error');
		}
	}

	return (
		<div>
			<h1>Reset Password</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					id="emailAddress"
					name="emailAddress"
					label="Email Address"
					className={classes.textInput}
					onChange={handleChange}
					value={formData.emailAddress}
					autoCapitalize="false"
				/>
				<Button variant="contained" type="submit" color="primary" className={classes.button}>
					Send Password Reset Link
				</Button>
			</form>
		</div>
	);
}
