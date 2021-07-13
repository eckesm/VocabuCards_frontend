import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getAllLanguageOptionsViaAPI } from '../../actions/vocab';

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
		width : '250px'
	}
}));

export default function SelectStartLanguage({ updateStartLanguage }) {
	const classes = useStyles();

	const { languages } = useSelector(store => store);
	const [ sortedLanguages, setSortedLanguages ] = useState([]);
	const dispatch = useDispatch();

	const handleChange = evt => {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
		updateStartLanguage(value);
	};

	const [ formData, setFormData ] = useState({
		startLanguage : ''
	});

	useEffect(
		() => {
			if (languages.length === 0) {
				dispatch(getAllLanguageOptionsViaAPI());
			}
			// help: https://stackoverflow.com/questions/3524827/sort-a-2d-array-by-the-second-value
			setSortedLanguages(
				languages.sort((a, b) => {
					return a[1] < b[1] ? -1 : a[1] > b[1] ? 1 : 0;
				})
			);
		},
		[ languages ]
	);

	return (
		<div>
			<FormControl className={classes.formControl}>
				<InputLabel id="language-label">Starting Foreign Language</InputLabel>
				<Select
					className={classes.select}
					labelId="language-label"
					id="startLanguage"
					name="startLanguage"
					value={formData.startLanguage}
					onChange={handleChange}
					label="Language"
					required
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
		</div>
	);
}
