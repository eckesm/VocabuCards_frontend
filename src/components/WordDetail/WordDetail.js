import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
// import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
// import Button from '@material-ui/core/Button';

import WordDetailAccordian from './WordDetailAccordian';
import './WordDetail.css';

const useStyles = makeStyles({
	root : {
		minWidth   : 275,
		marginTop  : '100px',
		fontFamily : 'roboto, sans-serif'
	}
	// bullet : {
	// 	display   : 'inline-block',
	// 	margin    : '0 2px',
	// 	transform : 'scale(0.8)'
	// },
	// title : {
	// 	fontSize  : '2rem',
	// 	textAlign : 'left'
	// },
	// pos   : {
	// 	marginBottom : 12
	// }
});

export default function WordDetail() {
	const { rootId } = useParams();
	const [ wordLoaded, setWordLoaded ] = useState(false);
	const word = useSelector(st => st.words_array.filter(w => w.id === rootId)[0]);

	useEffect(
		() => {
			if (word) {
				setWordLoaded(true);
			}
			else {
				setWordLoaded(false);
			}
		},
		[ word ]
	);

	const classes = useStyles();
	// const bull = <span className={classes.bullet}>•</span>;

	if (!wordLoaded) {
		return <h1>Loading...</h1>;
	}

	if (wordLoaded) {
		const notes = word.notes === '' ? null : word.notes;

		return (
			<Card className={classes.root}>
				<CardContent>
					<div className="VocabCardDetail-heading">
						<p className="VocabCardDetail-title">
							<b>{word.root.toLowerCase()}</b> - {word.translation.toLowerCase()}
						</p>

						{notes && (
							<div className="VocabCardDetail-wordInfoContainer">
								{notes && (
									<p className="VocabCardDetail-wordInfo">
										<b>Notes:</b> {notes}
									</p>
								)}
							</div>
						)}
					</div>

					<WordDetailAccordian word={word} />
				</CardContent>
				{/* <CardActions>
					<Button size="small">Learn More</Button>
				</CardActions> */}
			</Card>
		);
	}
}
