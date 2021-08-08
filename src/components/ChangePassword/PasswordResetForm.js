import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { sendPasswordResetViaAPI } from '../../helpers/API';
import useFields from '../../hooks/useFields';
import { clearAlerts, addAlert } from '../../actions/auth';

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

export default function PasswordResetForm({ setAlerts, setShowForm }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [ formData, handleChange ] = useFields({
		emailAddress : ''
	});
	const [ loading, setLoading ] = useState(false);

	async function handleSubmit(evt) {
		evt.preventDefault();
		setLoading(true);

		const res = await sendPasswordResetViaAPI(formData.emailAddress);
		dispatch(clearAlerts());

		try {
			if (res.status === 'success') {
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
				<CustomButton type="submit" style={{ marginTop: '20px' }} disabled={loading ? true : false}>
					{loading ? 'loading...' : 'Send Password Reset Link'}
				</CustomButton>
			</form>
		</div>
	);
}
