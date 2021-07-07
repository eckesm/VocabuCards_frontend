import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { registerUserViaAPI } from '../../actions/auth';
import { getUserInfo } from '../../actions/vocab';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SelectStartLanguage from './SelectStartLanguage';

// import { setUserLanguage } from '../../actions/vocab';

const useStyles = makeStyles(theme => ({
	container : {
		margin          : '0 auto',
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

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

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
		<div className={classes.container}>
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
				<SelectStartLanguage
					// id="startLanguage"
					// name="startLanguage"
					updateStartLanguage={updateStartLanguage}
				/>
				<Button variant="contained" type="submit" color="primary" className={classes.button}>
					Submit
				</Button>
			</form>
		</div>
	);
}
