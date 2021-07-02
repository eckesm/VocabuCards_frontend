import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { loginUserViaAPI } from '../../actions/auth';
// import { getUserLanguageWordsViaAPI, getAllLanguageOptionsViaAPI, getUserLastLanguageViaAPI } from '../actions/vocab';
import { getUserInfo } from '../../actions/vocab';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root : {
		'& > *' : {
			// margin  : theme.spacing(1),
			margin  : '0 auto',
			width   : '300px',
			display : 'flex'
			// 'margin-bottom':'10px'
		}
	},
	container:{
		marginTop:'150px'
	},
	button:{
		marginTop:'15px'
	}
}));

export default function LoginForm() {
	const user = useSelector(store => store.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const [ formData, setFormData ] = useState({
		emailAddress : '',
		password     : ''
	});

	useEffect(
		() => {
			if (user) {
				dispatch(getUserInfo());
				history.push('/words');
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

	function handleSubmit(evt) {
		evt.preventDefault();
		dispatch(loginUserViaAPI(formData.emailAddress, formData.password));
	}

	const classes = useStyles();

	return (
		<div className={classes.container}>
			<h1>Login Screen</h1>
			<form onSubmit={handleSubmit} className={classes.root}>
				<TextField
					id="emailAddress"
					name="emailAddress"
					label="Email Address"
					onChange={handleChange}
					value={formData.emailAddress}
				/>
				<TextField
					id="password"
					name="password"
					label="Password"
					type="password"
					onChange={handleChange}
					value={formData.password}
				/>
				<Button variant="outlined" type="submit" color="primary" className={classes.button}>
					Submit
				</Button>
			</form>
		</div>
	);
}
