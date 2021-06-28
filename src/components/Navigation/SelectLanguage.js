import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';

import { updateUserLastLanguageViaAPI, getUserLanguageWordsViaAPI, setUserLanguage } from '../../actions/vocab';

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
	}
}));

export default function SelectLanguage() {
	const classes = useStyles();

	const { languages } = useSelector(store => store);
	const [ language, setLanguage ] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();

	const handleChange = event => {
		const newLanguage = event.target.value;
		setLanguage(newLanguage);
		dispatch(setUserLanguage(newLanguage));
		dispatch(updateUserLastLanguageViaAPI(newLanguage));
		dispatch(getUserLanguageWordsViaAPI(newLanguage));
		history.push(`/words`);
	};

	return (
		<div>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id="language-label">Change Language</InputLabel>
				<Select
					labelId="language-label"
					id="language"
					value={language}
					onChange={handleChange}
					label="Language"
				>
					{languages.map(option => {
						return (
							<MenuItem key={option[0]} value={option[0]}>
								{option[1]}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}
