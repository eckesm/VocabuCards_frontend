import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

import SelectLanguage from '../Navigation/SelectLanguage';
import CustomButton from '../CustomButton';

const useStyles = makeStyles(theme => ({
	container : {
		marginTop    : '25px',
		marginBottom : '25px'
	},
	button    : {
		marginTop   : '15px',
		marginLeft  : '5px',
		marginRight : '5px'
	},
	select    : {
		marginTop : '25px'
	}
}));

export default function Welcome() {
	const classes = useStyles();
	const history = useHistory();
	// const { user, language, language_object, subscription_status } = useSelector(store => store);
	const { user, language, language_object } = useSelector(store => store);
	const languageName = language_object[language];
	const [ checkLogin, setCheckLogin ] = useState(false);

	setTimeout(() => {
		setCheckLogin(true);
	}, 5000);

	function goToHomeScreen() {
		history.push('/');
	}

	useEffect(
		() => {
			if (user) {
				history.push('/');
			}
		},
		[ user ]
	);

	return (
		<div className={classes.container}>
			{!user && (
				<div className={classes.container}>
					<div>
						<h4>
							<i>...logging in and loading your subscription...</i>
						</h4>
						{checkLogin && <CustomButton onClick={goToHomeScreen}>Return to Login</CustomButton>}
					</div>
				</div>
			)}

			{user &&
			// subscription_status !== 'canceled' &&
			// subscription_status !== 'past_due' && (
				(
				<div>
					<CustomButton
						style={{ width: '275px' }}
						href="/#/study-text"
						endIcon={<i className="fas fa-arrow-circle-right" />}
					>
						Study {languageName} Text
					</CustomButton>
					<CustomButton
						style={{ width: '275px' }}
						href="/#/words"
						endIcon={<i className="fas fa-arrow-circle-right" />}
					>
						{languageName} VocabuCards
					</CustomButton>
					<div className={classes.select}>
						<SelectLanguage />
					</div>
				</div>
			)}

			{/* {user &&
			(subscription_status === 'canceled' || subscription_status === 'past_due') && (
				<div>
					<CustomButton
						style={{ width: '275px' }}
						href="/#/plans"
						endIcon={<i className="fas fa-arrow-circle-right" />}
					>
						Update Subscription
					</CustomButton>
				</div>
			)} */}
		</div>
	);
}
