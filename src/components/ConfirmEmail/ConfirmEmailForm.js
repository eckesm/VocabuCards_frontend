import React from 'react';
import { useHistory } from 'react-router';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { confirmEmailViaAPI } from '../../helpers/API';
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

export default function ConfirmEmailForm({ token, setAlerts, setShowForm }) {
	const classes = useStyles();
	const history = useHistory();

	const [ formData, handleChange ] = useFields({
		password : ''
	});

	async function handleSubmit(evt) {
		evt.preventDefault();
		const res = await confirmEmailViaAPI(token, formData.password);
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
					closeMs : DEFAULT_ALERT_CLOSE_MS * 2
				}
			]);
		} catch (e) {
			history.push('/error');
		}
	}

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
				<Button variant="contained" type="submit" color="primary" className={classes.button}>
					Confirm Email Address
				</Button>
			</form>
		</div>
	);
}