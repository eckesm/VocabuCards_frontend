import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';

import WordCard from './WordCard';

const useStyles = makeStyles(theme => ({
	root           : {
		fontFamily                     : 'roboto, sans-serif',
		border                         : '1px solid rgb(200, 200, 200)',
		padding                        : '15px',
		paddingBottom                  : '25px',
		backgroundColor                : 'snow',
		borderRadius                   : '3px',
		[theme.breakpoints.down('sm')]: {
			margin : '5px'
		},
		[theme.breakpoints.up('md')]: {
			margin    : '15px',
			boxShadow : '5px 5px 8px grey'
		},
		[theme.breakpoints.up('lg')]: {
			margin : '25px'
		}
	},
	container      : {
		display  : 'flex',
		flexWrap : 'wrap'
		// justifyContent : 'space-around'
	},
	emptyContainer : {
		flexWrap : 'wrap'
	}
}));

export default function VocabWordsAll() {
	const classes = useStyles();
	const { words_array = [] } = useSelector(store => store);
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
			{loading && (
				<h4>
					<i>Loading...</i>
				</h4>
			)}
			{!loading && (
				<div className={words_array.length > 0 ? classes.container : classes.emptyContainer}>
					{words_array.length > 0 &&
						words_array.map(word => {
							return <WordCard key={word['id']} word={word} />;
						})}
					{words_array.length === 0 && (
						<h4>
							<i>No vocab words yet!</i>
						</h4>
					)}
				</div>
			)}
		</div>
	);
}
