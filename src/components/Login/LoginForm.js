import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TextField, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { clearAlerts, addAlert, loginUserViaAPI } from '../../actions/auth';
import useFields from '../../hooks/useFields';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import CustomButton from '../CustomButton';

const useStyles = makeStyles(theme => ({
	textInput     : {
		marginBottom : '10px',
		width        : '250px'
	},
	button        : {
		marginTop : '15px'
	},
	link          : {
		marginTop    : '5px',
		marginBottom : '5px'
	},
	linkContainer : {
		marginTop : '25px'
	}
}));

export default function LoginForm({ startEmailAddress = null, forward = false }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const [ email, setEmail ] = useLocalStorageState('email_address', '');
	const initialState = {
		emailAddress : email,
		password     : ''
	};
	const [ formData, handleChange ] = useFields(initialState);
	const [ loading, setLoading ] = useState(false);

	async function handleSubmit(evt) {
		evt.preventDefault();
		setLoading(true);

		const res = await dispatch(loginUserViaAPI(formData.emailAddress, formData.password));
		dispatch(clearAlerts());

		try {
			if (res.status === 'validation_errors') {
				try {
					Object.keys(res.errors).forEach(err => {
						res.errors[err].forEach(msg => {
							dispatch(
								addAlert({
									type : 'error',
									text : msg
								})
							);
						});
					});
				} catch (e) {
					console.log(e);
				}
			}
			else {
				try {
					dispatch(
						addAlert({
							type  : res.status,
							title : res.title,
							text  : res.message
						})
					);
					if (res.status === 'success') {
						setEmail(formData.emailAddress);
						if (forward === false) {
							history.push('/welcome');
						}
					}
				} catch (e) {
					history.push('/error');
				}
			}
		} catch (e) {
			dispatch(
				addAlert({
					type  : 'error',
					title : 'Connection Error!',
					text  : 'There was an error connecting to the server or database.'
				})
			);
		}

		setLoading(false);
	}

	useEffect(() => {
		if (startEmailAddress) formData.emailAddress = startEmailAddress;
	}, []);

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					id="emailAddress"
					name="emailAddress"
					label="Email Address"
					className={classes.textInput}
					onChange={handleChange}
					value={formData.emailAddress}
					autoCapitalize="false"
					required
				/>
				<TextField
					id="password"
					name="password"
					label="Password"
					className={classes.textInput}
					type="password"
					onChange={handleChange}
					value={formData.password}
					required
				/>
				<CustomButton
					type="submit"
					style={{ marginTop: '20px', width: '125px' }}
					disabled={loading ? true : false}
				>
					{loading ? <i>Loading</i> : 'Submit'}
				</CustomButton>
			</form>
			<div className={classes.linkContainer}>
				<div className={classes.link}>
					<Link href="/#/new-user" onClick={() => dispatch(clearAlerts())}>
						<i>Create an account.</i>
					</Link>
				</div>
				<div className={classes.link}>
					<Link href="/#/reset-password" onClick={() => dispatch(clearAlerts())}>
						<i>Forgot password.</i>
					</Link>
				</div>
			</div>
		</div>
	);
}
