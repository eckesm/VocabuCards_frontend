import React from 'react';
import Word from './Word';
import { v4 as uuid } from 'uuid';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paragraph : {
		marginTop    : '25px',
		marginBottom : '25px'
	}
}));

export default function Paragraph({ paragraphArray, updateModalText, clickedArray, addToClickedArray }) {
	const classes = useStyles();

	function formSentenceText(sentenceArray) {
		let sentenceText = '';
		sentenceArray.forEach((word, i) => {
			if (i === 1 && word.type === 'space') {
			}
			else {
				sentenceText = sentenceText + word.text;
			}
		});
		return sentenceText;
	}

	return (
		<div className={classes.paragraph}>
			{/* {paragraphArray.map((sentence, i) => { */}
			{paragraphArray.map(sentence => {
				const sentenceText = formSentenceText(sentence);
				// return sentence.map((word, idx) => {
				return sentence.map(word => {
					return (
						<Word
							// key={`${i}-${idx}`}
							key={uuid()}
							wordObject={word}
							updateModalText={updateModalText}
							sentenceText={sentenceText}
							clickedArray={clickedArray}
							addToClickedArray={addToClickedArray}
						/>
					);
				});
			})}
		</div>
	);
}
