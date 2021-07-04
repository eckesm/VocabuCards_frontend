import React from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import WordCard from './WordCard';

const useStyles = makeStyles(theme => ({
	root      : {
		marginTop       : '100px',
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
		justifyContent : 'space-between'
	}
}));

export default function VocabWordsAll() {
	const classes = useStyles();
	const { words_array } = useSelector(store => store);

	return (
		<div className={classes.root}>
			<h1>Vocabulary Words</h1>
			<div className={classes.container}>
				{words_array &&
					words_array.map(word => {
						return <WordCard key={word['id']} word={word} />;
					})}
			</div>
		</div>
	);
}
