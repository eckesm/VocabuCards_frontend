import React from 'react';
import { useHistory } from 'react-router';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { resetPasswordViaAPI } from '../../helpers/API';
import useFields from '../../hooks/useFields';
import { DEFAULT_ALERT_CLOSE_MS } from '../../settings';

import CustomButton from '../CustomButton';

const useStyles = makeStyles(theme => ({
	textInput : {
		marginBottom : '10px',
		width        : '250px'
	},
	button    : {
		marginTop : '15px'
	}
}));

export default function NewPasswordForm({ token, setAlerts, setShowForm }) {
	const classes = useStyles();
	const history = useHistory();

	const [ formData, handleChange ] = useFields({
		password      : '',
		passwordCheck : ''
	});

	async function handleSubmit(evt) {
		evt.preventDefault();
		const res = await resetPasswordViaAPI(token, formData.password, formData.passwordCheck);
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
			<h1>Change Password</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					id="password"
					name="password"
					label="New Password"
					className={classes.textInput}
					onChange={handleChange}
					value={formData.password}
					type="password"
				/>
				<TextField
					id="passwordCheck"
					name="passwordCheck"
					label="Re-enter New Password"
					className={classes.textInput}
					onChange={handleChange}
					value={formData.passwordCheck}
					type="password"
				/>
				<CustomButton 
				// variant="contained" 
				type="submit" 
				// color="primary" 
				// className={classes.button}
				style={{ marginTop: '20px', width:'250px' }}
				>
					Change Password
				</CustomButton>
			</form>
		</div>
	);
}
