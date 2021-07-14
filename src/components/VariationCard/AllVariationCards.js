import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';

import VariationCard from './VariationCard';

const useStyles = makeStyles(theme => ({
	allCards  : {
		fontFamily : 'roboto, sans-serif',
		width      : '100%'
	},
	container : {
		display  : 'flex',
		flexWrap : 'wrap'
	}
}));

export default function AllVariationCards({ pos, wordId }) {
	const classes = useStyles();
	const { words_array } = useSelector(store => store);
	const [ variations, setVariations ] = useState([]);

	useEffect(
		() => {
			const word = words_array.filter(w => w.id === wordId)[0];
			setVariations(word.components.filter(c => c.part_of_speech === pos));
		},
		[ words_array ]
	);

	return (
		<div className={classes.allCards}>
			<div className={classes.container}>
				{variations &&
					variations.map(variation => {
						const id = variation['id'] ? variation['id'] : uuid();
						return <VariationCard key={id} initialVariation={variation} />;
					})}
			</div>
		</div>
	);
}
