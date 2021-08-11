import React from 'react';
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
	const { user, language, language_object } = useSelector(store => store);
	const languageName = language_object[language];

	setTimeout(() => {
		history.push('/');
	}, 5000);

	return (
		<div className={classes.container}>
			{!user && (
				<div className={classes.container}>
					<div>
						<h4>
							<i>...loading...</i>
						</h4>
					</div>
				</div>
			)}

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
		</div>
	);
}
