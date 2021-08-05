import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

import WordCard from './WordCard';
import SelectWord from '../SelectWord';

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
	},
	emptyContainer : {
		flexWrap : 'wrap'
	}
}));

export default function VocabWordsAll() {
	const classes = useStyles();
	const history = useHistory();
	const { words_array = [] } = useSelector(store => store);
	// const wordChoices = [];
	// words_array.forEach(choice => {
	// 	wordChoices.push({ value: choice.id, name: choice.root });
	// });
	const [ loading, setLoading ] = useState(true);

	useEffect(
		() => {
			if (words_array !== null) {
				setLoading(false);
			}
		},
		[ words_array ]
	);

	function returnSelection(wordChoice) {
		history.push(`/words/${wordChoice}`);
	}

	return (
		<div className={classes.root}>
			<h1>Vocabulary Words</h1>
			{loading && (
				<h4>
					<i>Loading...</i>
				</h4>
			)}
			{!loading && (
				<div>
					<SelectWord
						id="word"
						name="word"
						label="Go To Word"
						// wordChoices={wordChoices}
						returnSelection={returnSelection}
						isRequired={false}
					/>
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
				</div>
			)}
		</div>
	);
}
