import React from 'react';
import { useHistory } from 'react-router';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { resetPasswordViaAPI } from '../../helpers/API';
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

export default function NewPasswordForm({ token, addAlert, setShowForm }) {
	const classes = useStyles();
	const history = useHistory();

	const [ formData, handleChange ] = useFields({
		password      : '',
		passwordCheck : ''
	});

	async function handleSubmit(evt) {
		evt.preventDefault();
		const res = await resetPasswordViaAPI(token, formData.password, formData.passwordCheck);

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
					type  : 'warning',
					title : 'Password Mismatch!',
					text  : res.message
				});
			}
			if (res.status === 'error') {
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
				<Button variant="contained" type="submit" color="primary" className={classes.button}>
					Change Password
				</Button>
			</form>
		</div>
	);
}
