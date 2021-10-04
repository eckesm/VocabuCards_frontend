import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	formControl : {
		margin   : theme.spacing(1),
		minWidth : 200
	},
	selectEmpty : {
		marginTop : theme.spacing(2)
	}
}));

export default function SelectWord({
	id,
	label,
	returnSelection,
	isRequired = false,
	addNew = false
}) {
	const classes = useStyles();
	const [ data, setData ] = useState('');
	const { words_array = [] } = useSelector(store => store);
	const wordChoices = [];
	try {
		words_array.forEach(choice => {
			wordChoices.push({ value: choice.id, name: choice.root });
		});
	} catch (e) {}

	useEffect(() => {
		// words_array.forEach(choice => {
		// 	wordChoices.push({ value: choice.id, name: choice.root });
		// });
		if (addNew) {
			setData('new_word');
		}
	}, []);

	const handleChange = event => {
		setData(event.target.value);
		returnSelection(event.target.value);
	};

	return (
		<div>
			<FormControl variant="outlined" className={classes.formControl} required={isRequired ? true : false}>
				<InputLabel id={id}>{label}</InputLabel>
				<Select
					labelId={id}
					id={id}
					value={data}
					onChange={handleChange}
					label={label}
					disabled={wordChoices.length === 0 ? true : false}
				>
					{addNew && (
						<MenuItem key="NONE" value="new_word">
							-- NEW WORD --
						</MenuItem>
					)}
					{wordChoices.map(choice => {
						return (
							<MenuItem key={choice.value} value={choice.value}>
								{choice.name}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}
