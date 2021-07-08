import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import WordCard from './WordCard';

const useStyles = makeStyles(theme => ({
	root      : {
		marginTop       : '40px',
		fontFamily      : 'roboto, sans-serif',
		border          : '1px solid rgb(200, 200, 200)',
		padding         : '15px',
		paddingBottom   : '25px',
		backgroundColor : 'snow',
		borderRadius    : '3px'
	},
	container : {
		display        : 'flex',
		flexWrap       : 'wrap',
		justifyContent : 'space-around'
	}
}));

export default function VocabWordsAll() {
	const classes = useStyles();
	const { words_array } = useSelector(store => store);
	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			if (words_array !== null) {
				setLoading(false);
			}
		},
		[ words_array ]
	);
	return (
		<div className={classes.root}>
			<h1>Vocabulary Words</h1>
			<div className={classes.container}>
				{!loading &&
					words_array.length > 0 &&
					words_array.map(word => {
						return <WordCard key={word['id']} word={word} />;
					})}
				{!loading &&
				words_array.length === 0 && (
					<h4>
						<i>No vocab words yet!</i>
					</h4>
				)}
			</div>
		</div>
	);
}
