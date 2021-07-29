import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles(theme => ({
	formControl : {
		margin : theme.spacing(1),
		// minWidth : 120,
		width  : 345
		// whiteSpace : 'pre-wrap'
	},
	selectEmpty : {
		marginTop : theme.spacing(2)
	}
}));

export default function SelectDictionary({ id, label, updateDictionary, dictionaryChoices = [] }) {
	const classes = useStyles();
	const [ data, setData ] = useState('');

	useEffect(
		() => {
			try {
				if (dictionaryChoices.length > 0) {
					setData(dictionaryChoices[0]);
					updateDictionary(dictionaryChoices[0]);
				}
			} catch (e) {
				console.log(e);
			}
		},
		[ dictionaryChoices ]
	);

	const handleChange = event => {
		setData(event.target.value);
		updateDictionary(event.target.value);
	};

	return (
		<div>
			<FormControl variant="outlined" className={classes.formControl}>
				<InputLabel id={id}>{label}</InputLabel>
				<Select labelId={id} id={id} value={data} onChange={handleChange} label={label}>
					{dictionaryChoices.map((choice, i) => {
						return (
							<MenuItem key={i} value={choice}>
								{choice.definition}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}
