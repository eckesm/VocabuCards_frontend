import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
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

export default function SelectWord({ id, label, value, updateExistingWord, wordChoices = [] }) {
	const classes = useStyles();
	const [ data, setData ] = useState('');

	useEffect(() => {
		try {
			if (wordChoices.length > 0) {
				setData(wordChoices[0]);
			}
		} catch (e) {
			console.log(e);
		}
	}, [wordChoices]);

	const handleChange = event => {
		setData(event.target.value);
		updateExistingWord(event.target.value);
	};

	return (
		<div>
			<FormControl required variant="outlined" className={classes.formControl}>
				<InputLabel id={id}>{label}</InputLabel>
				<Select labelId={id} id={id} value={data} onChange={handleChange} label={label}>
					{wordChoices.map(choice => {
						return (
							<MenuItem key={choice.id} value={choice}>
								{choice.root}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}
