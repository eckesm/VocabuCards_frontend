import React, { useState, useEffect } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { partsOfSpeechSelectMenuItems } from '../../helpers/partsOfSpeech';

const useStyles = makeStyles(theme => ({
	formControl : {
		margin   : theme.spacing(1),
		minWidth : 200
	},
	selectEmpty : {
		marginTop : theme.spacing(2)
	}
}));

export default function SelectPOS({ id, label, updatePOS, value, isRequired = true }) {
	const classes = useStyles();
	const [ data, setData ] = useState(value);

	useEffect(
		() => {
			setData(value);
		},
		[ value ]
	);

	const handleChange = event => {
		setData(event.target.value);
		updatePOS(event.target.value);
	};

	return (
		<div>
			<FormControl required={isRequired} variant="outlined" className={classes.formControl}>
				<InputLabel id={id}>{label}</InputLabel>
				<Select labelId={id} id={id} value={data} onChange={handleChange} label={label}>
					{partsOfSpeechSelectMenuItems.map(choice => {
						return (
							<MenuItem key={choice[1]} value={choice[1]}>
								{choice[0]}
							</MenuItem>
						);
					})}
				</Select>
			</FormControl>
		</div>
	);
}
