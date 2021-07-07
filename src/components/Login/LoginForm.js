import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TextField, Button, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { loginUserViaAPI } from '../../actions/auth';

const useStyles = makeStyles(theme => ({
	container     : {
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

	const [ formData, setFormData ] = useState({
		emailAddress : '',
		password     : ''
	});

	useEffect(
		() => {
			if (user) {
				history.push('/words');
			}
		},
		[ user, history ]
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
		const res = await dispatch(loginUserViaAPI(formData.emailAddress, formData.password));

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

	return (
		<div className={classes.container}>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
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
				<Button variant="contained" type="submit" color="primary" className={classes.button}>
					Submit
				</Button>
			</form>
			<div className={classes.linkContainer}>
				<div className={classes.link}>
					<Link href="/#/signup">
						<i>Create an account.</i>
					</Link>
				</div>
				<div className={classes.link}>
					<Link href="/#/reset-password">
						<i>Forgot password.</i>
					</Link>
				</div>
			</div>
		</div>
	);
}
