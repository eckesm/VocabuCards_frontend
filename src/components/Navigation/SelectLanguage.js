import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { updateUserLastLanguageViaAPI, getUserLanguageWordsViaAPI } from '../../actions/vocab';
import { clearAlerts, addAlert } from '../../actions/auth';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	formControl : {
		margin   : theme.spacing(1),
		minWidth : 120
	},
	selectEmpty : {
		marginTop : theme.spacing(2)
	},
	select      : {
		width : '200px'
	}
}));

export default function SelectLanguage() {
	const classes = useStyles();

	const { languages, subscription_status } = useSelector(store => store);
	const currentLanguage = useSelector(store => store.language);
	const [ sortedLanguages, setSortedLanguages ] = useState([]);
	const [ language, setLanguage ] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();

	async function handleChange(event) {
		const newLanguage = event.target.value;
		setLanguage(newLanguage);
		await dispatch(updateUserLastLanguageViaAPI(newLanguage));
		dispatch(getUserLanguageWordsViaAPI(newLanguage));
		dispatch(clearAlerts());

		let newLanguageFull;
		for (let lang of languages) {
			if (lang[0] === newLanguage) {
				newLanguageFull = lang[1];
			}
		}

		dispatch(
			addAlert({
				type  : 'success',
				title : `Language Changed to ${newLanguageFull}`,
				text  : `You have successfully switched your language to ${newLanguageFull}.  Your ${newLanguageFull} VocabuCards are now available.`
			})
		);
		history.push('/home');
	}

	useEffect(
		() => {
			// help: https://stackoverflow.com/questions/3524827/sort-a-2d-array-by-the-second-value
			setSortedLanguages(
				languages.sort((a, b) => {
					return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
				})
			);
			setLanguage(currentLanguage);
		},
		[ languages ]
	);

	return (
		<div>
			{(subscription_status === 'active' || subscription_status === 'trialing') && (
				<FormControl variant="outlined" className={classes.formControl}>
					<InputLabel id="language-label">Change Language</InputLabel>
					<Select
						className={classes.select}
						labelId="language-label"
						id="language"
						value={language}
						onChange={handleChange}
						label="Change Language"
					>
						{sortedLanguages.map(option => {
							if (option[0] !== 'en') {
								return (
									<MenuItem key={option[0]} value={option[0]}>
										{option[1]}
									</MenuItem>
								);
							}
						})}
					</Select>
				</FormControl>
			)
			//  : (
			// <p>Cannot change languages when account is not active.</p>
			// )
			}
		</div>
	);
}
