import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TextField, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { clearAlerts } from '../../actions/auth';
import { loginUserViaAPI } from '../../actions/auth';
import useFields from '../../hooks/useFields';
import useLocalStorageState from '../../hooks/useLocalStorageState';

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

export default function LoginForm({ addAlert }) {
	const classes = useStyles();
	const { user } = useSelector(store => store);
	const dispatch = useDispatch();
	const history = useHistory();
	const [ email, setEmail ] = useLocalStorageState('email_address', '');
	const initialState = {
		emailAddress : email,
		password     : ''
	};
	const [ formData, handleChange ] = useFields(initialState);

	useEffect(
		() => {
			if (user) {
				history.push('/words');
			}
		},
		[ user, history ]
	);

	async function handleSubmit(evt) {
		evt.preventDefault();
		const res = await dispatch(loginUserViaAPI(formData.emailAddress, formData.password));

		try {
			if (res.status === 'success') {
				setEmail(formData.emailAddress);
			}
			if (res.status === 'fail') {
				addAlert({
					type  : 'warning',
					title : 'Incorrect!',
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
				/>
				<TextField
					id="password"
					name="password"
					label="Password"
					className={classes.textInput}
					type="password"
					onChange={handleChange}
					value={formData.password}
				/>
				<Button variant="contained" type="submit" color="primary" className={classes.button}>
					Submit
				</Button>
			</form>
			<div className={classes.linkContainer}>
				<div className={classes.link}>
					<Link href="/#/signup" onClick={() => dispatch(clearAlerts())}>
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
