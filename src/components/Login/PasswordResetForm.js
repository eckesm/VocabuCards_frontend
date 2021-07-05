import React, { useState } from 'react';
import { sendPasswordResetViaAPI } from '../../helpers/API';

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

export default function PasswordResetForm({ addAlert, setShowForm }) {
	const [ formData, setFormData ] = useState({
		emailAddress : ''
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
		const res = await sendPasswordResetViaAPI(formData.emailAddress);
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
	}

	const classes = useStyles();

	return (
		<div className={classes.container}>
			<h1>Reset Password</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					id="emailAddress"
					name="emailAddress"
					label="Email Address"
					className={classes.textInput}
					onChange={handleChange}
					value={formData.emailAddress}
				/>
				<Button variant="contained" type="submit" color="primary" className={classes.button}>
					Send Password Reset Link
				</Button>
			</form>
		</div>
	);
}
