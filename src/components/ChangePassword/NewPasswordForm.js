import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { resetPasswordViaAPI } from '../../helpers/API';
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

export default function NewPasswordForm({ token, setShowForm }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [ formData, handleChange ] = useFields({
		password      : '',
		passwordCheck : ''
	});
	const [ loading, setLoading ] = useState(false);

	async function handleSubmit(evt) {
		evt.preventDefault();
		setLoading(true);

		const res = await resetPasswordViaAPI(token, formData.password, formData.passwordCheck);
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
					type="submit"
					style={{ marginTop: '20px', width: '250px' }}
					disabled={loading ? true : false}
				>
					{loading ? 'loading...' : 'Change Password'}
				</CustomButton>
			</form>
		</div>
	);
}
