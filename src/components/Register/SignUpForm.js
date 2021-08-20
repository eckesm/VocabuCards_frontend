import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { TextField, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { registerUserViaAPI } from '../../actions/auth';
import { clearAlerts, addAlert } from '../../actions/auth';

import SelectStartLanguage from './SelectStartLanguage';
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

export default function SignUpForm() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();

	const [ formData, setFormData ] = useState({
		userName      : '',
		emailAddress  : '',
		password      : '',
		passwordCheck : '',
		startLanguage : ''
	});
	const [ loading, setLoading ] = useState(false);

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

	async function handleSubmit(evt) {
		evt.preventDefault();
		dispatch(clearAlerts());
		setLoading(true);

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
			if (res.status === 'success') {
				history.push('/getting-started');
			}
			if (res.status === 'warning') {
				dispatch(
					addAlert({
						type    : res.status,
						title   : res.title,
						text    : res.message,
						closeMs : false
					})
				);
			}
			if (res.status === 'error') {
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
		} catch (e) {
			history.push('/error');
		}

		setLoading(false);
	}

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
					required
				/>
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
				<TextField
					id="passwordCheck"
					name="passwordCheck"
					label="Re-enter Password"
					className={classes.textInput}
					type="password"
					onChange={handleChange}
					value={formData.passwordCheck}
					required
				/>
				<SelectStartLanguage updateStartLanguage={updateStartLanguage} />
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
					<Link href="/#/login" onClick={() => dispatch(clearAlerts())}>
						<i>Already have an account?</i>
					</Link>
				</div>
			</div>
		</div>
	);
}
