import React from 'react';
import { useSelector } from 'react-redux';

import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import SelectLanguage from './Navigation/SelectLanguage';
import CustomButton from './CustomButton';

const useStyles = makeStyles(theme => ({
	container : {
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
	button    : {
		marginTop   : '15px',
		marginLeft  : '5px',
		marginRight : '5px'
	},
	select    : {
		marginTop : '20px'
	}
}));

export default function Home() {
	const classes = useStyles();
	const { user, language, language_object } = useSelector(store => store);
	const languageName = language_object[language];

	return (
		<div className={classes.container}>
			<h1>Welcome to VocabuCards!</h1>
			{user && (
				<div>
					<CustomButton
						// variant="contained"
						// color="primary"
						// size="large"
						// className={classes.button}
						style={{ width: '275px' }}
						href="/#/read"
						endIcon={<i className="fas fa-arrow-circle-right" />}
					>
						Study {languageName} Text
					</CustomButton>
					<CustomButton
						// variant="contained"
						// color="primary"
						// size="large"
						// className={classes.button}
						style={{ width: '275px' }}
						href="/#/words"
						endIcon={<i className="fas fa-arrow-circle-right" />}
					>
						{languageName} Vocab Words
					</CustomButton>
					<div className={classes.select}>
						<SelectLanguage />
					</div>
				</div>
			)}
			{!user && (
				<div>
					<CustomButton // color="primary" // variant="contained"
					// size="large"
					// className={classes.button}
					href="/#/login">
						Login
					</CustomButton>
					<CustomButton
						// variant="contained"
						// color="default"
						// size="large"
						// className={classes.button}
						href="/#/signup"
						customType="default"
					>
						New User
					</CustomButton>
				</div>
			)}
		</div>
	);
}
