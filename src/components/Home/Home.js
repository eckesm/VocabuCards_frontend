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

export default function Home({ status = null }) {
	const classes = useStyles();
	const history = useHistory();
	const { user, language, language_object } = useSelector(store => store);
	const languageName = language_object[language];
	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			if (user && user.length > 0) {
				setLoading(false);
			}
		},
		[ user ]
	);

	setTimeout(() => {
		if (loading && status === 'welcome' && user === null) {
			history.push('/');
		}
	}, 1000);

	if (status === 'welcome' && loading) {
		return (
			<div className={classes.container}>
				<div>
					<h4>
						<i>...loading...</i>
					</h4>
				</div>
			</div>
		);
	}
	else {
		return (
			<div className={classes.container}>
				{user && (
					<div>
						<CustomButton
							style={{ width: '275px' }}
							href="/#/read"
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
				{!user && (
					<div>
						<CustomButton href="/#/login">Login</CustomButton>
						<CustomButton href="/#/signup" customtype="default">
							New User
						</CustomButton>
					</div>
				)}
			</div>
		);
	}
}
