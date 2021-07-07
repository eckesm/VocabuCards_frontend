import React, { useState } from 'react';
import { useHistory } from 'react-router';

import { resetPasswordViaAPI } from '../../helpers/API';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container : {
		margin          : '0 auto',
		marginTop       : '100px',
		width           : '300px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '40px',
		backgroundColor : 'snow',
		borderRadius    : '3px',
		boxShadow       : '5px 5px 8px grey'
	},
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

	const [ formData, setFormData ] = useState({
		password      : '',
		passwordCheck : ''
	});

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

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
		<div className={classes.container}>
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
