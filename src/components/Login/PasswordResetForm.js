import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { sendPasswordResetViaAPI } from '../../helpers/API';
import useFields from '../../hooks/useFields';

const useStyles = makeStyles(theme => ({
	textInput : {
		marginBottom : '10px',
		width        : '250px'
	},
	button    : {
		marginTop : '15px'
	}
}));

export default function PasswordResetForm({ addAlert, setShowForm }) {
	const classes = useStyles();
	const history = useHistory();

	const [ formData, handleChange ] = useFields({
		emailAddress : ''
	});

	async function handleSubmit(evt) {
		evt.preventDefault();
		const res = await sendPasswordResetViaAPI(formData.emailAddress);

		try {
			if (res.status === 'success') {
				setShowForm(false);
				addAlert({
					type  : 'success',
					title : 'Success!',
					text  : res.message
				});
			}
			if (res.status === 'fail') {
				addAlert({
					type  : 'error',
					title : 'Error!',
					text  : res.message
				});
			}
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
