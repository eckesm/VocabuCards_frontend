import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { makeStyles } from '@material-ui/core/styles';

import NavBar from '../Navigation/NavBar';
import WordCard from './WordCard';
import SelectWord from '../SelectWord';

import { SCREEN_WELCOME_MOBILE, SCREEN_WELCOME_DESKTOP } from '../../settings';


const useStyles = makeStyles(theme => ({
	screen         : {
		height                         : 'max-content',
		minHeight                      : '100vh',
		paddingBottom                  : '25px',
		backgroundRepeat : 'repeat-y',
		backgroundSize   : '100%',
		[theme.breakpoints.down('xs')]: {
			backgroundImage : `url(${SCREEN_WELCOME_MOBILE})`,
			// backgroundColor : 'linen'
		},
		[theme.breakpoints.up('sm')]: {
			backgroundImage  : `url(${SCREEN_WELCOME_DESKTOP})`,
		}
	},
	container      : {
		margin                         : '0 auto',
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		padding                        : '15px',
		paddingBottom                  : '25px',
		backgroundColor                : 'snow',
		[theme.breakpoints.down('xs')]: {
			margin    : '18px',
			marginTop : '-45px'
		},
		[theme.breakpoints.up('sm')]: {
			margin    : '40px',
			marginTop : '-35px',
			boxShadow : '5px 5px 10px black'
		},
		[theme.breakpoints.up('md')]: {
			margin       : '80px',
			marginTop    : '-10px',
			marginBottom : '40px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('lg')]: {
			margin       : '160px',
			marginTop    : '0px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		},
		[theme.breakpoints.up('xl')]: {
			margin       : '500px',
			marginTop    : '0px',
			marginBottom : '80px',
			boxShadow    : '5px 5px 10px black'
		}
	},
	fullContainer  : {
		display        : 'flex',
		flexWrap       : 'wrap',
		justifyContent : 'space-around'
	},
	emptyContainer : {
		flexWrap : 'wrap'
	}
}));

export default function AllWordCardsScreen() {
	const classes = useStyles();
	const history = useHistory();
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

	function returnSelection(wordChoice) {
		history.push(`/words/${wordChoice}`);
	}

	return (
		<div className={classes.screen}>
			<NavBar />
			<div className={classes.container}>
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
						<div className={words_array.length > 0 ? classes.fullContainer : classes.emptyContainer}>
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
		</div>
	);
}
