import React from 'react';
import { useSelector } from 'react-redux';

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

export default function Home() {
	const classes = useStyles();
	const { user, language, language_object } = useSelector(store => store);
	const languageName = language_object[language];

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
// }
