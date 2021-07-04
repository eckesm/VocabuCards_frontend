import React from 'react';
import Word from './Word';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	paragraph : {
		marginTop    : '25px',
		marginBottom : '25px'
	}
}));

export default function Paragraph({ paragraphArray, updateModalText }) {
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
			{paragraphArray.map((sentence, i) => {
				const sentenceText = formSentenceText(sentence);
				return sentence.map((word, idx) => {
					return (
						<Word
							key={`${i}-${idx}`}
							wordObject={word}
							updateModalText={updateModalText}
							sentenceText={sentenceText}
						/>
					);
				});
			})}
		</div>
	);
}
