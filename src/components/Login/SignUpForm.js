import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { getUserInfo } from '../../actions/vocab';
import { TextField, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { registerUserViaAPI } from '../../actions/auth';
import { clearAlerts } from '../../actions/auth';

import SelectStartLanguage from './SelectStartLanguage';

// import { setUserLanguage } from '../../actions/vocab';

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

export default function SignUpForm({ addAlert }) {
	const user = useSelector(store => store.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const [ formData, setFormData ] = useState({
		userName      : '',
		emailAddress  : '',
		password      : '',
		passwordCheck : '',
		startLanguage : ''
	});

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

	function updateStartLanguage(source_code) {
		setFormData({
			...formData,
			startLanguage : source_code
		});
	}

	useEffect(
		() => {
			if (user) {
				dispatch(getUserInfo());
				history.push('/read');
			}
		},
		[ user, history, dispatch ]
	);

	async function handleSubmit(evt) {
		evt.preventDefault();
		const res = await dispatch(
			registerUserViaAPI(
				formData.userName,
				formData.emailAddress,
				formData.password,
				formData.passwordCheck,
				formData.startLanguage
			)
		);

		try {
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

	const classes = useStyles();

	return (
		<div>
			<h1>New User</h1>
			<form onSubmit={handleSubmit}>
				<TextField
					id="userName"
					name="userName"
					label="What name should we call you?"
					className={classes.textInput}
					onChange={handleChange}
					value={formData.userName}
				/>
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
				<TextField
					id="passwordCheck"
					name="passwordCheck"
					label="Re-enter Password"
					className={classes.textInput}
					type="password"
					onChange={handleChange}
					value={formData.passwordCheck}
				/>
				<SelectStartLanguage updateStartLanguage={updateStartLanguage} />
				<Button variant="contained" type="submit" color="primary" className={classes.button}>
					Submit
				</Button>
			</form>
			<div className={classes.linkContainer}>
				<div className={classes.link}>
					<Link href="/#/login" onClick={() => dispatch(clearAlerts())}>
						<i>Already have an account?</i>
					</Link>
				</div>
			</div>
		</div>
	);
}
