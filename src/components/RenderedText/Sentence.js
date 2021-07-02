import React from 'react';
import Word from './Word';
import './RenderedText.css';

export default function Sentence({ sentenceArray, updateModalText }) {
	let sentenceText = '';
	sentenceArray.forEach((word, i) => {
		if (i === 1 && word.type === 'space') {
		}
		else {
			sentenceText = sentenceText + word.text;
		}
	});

	console.log(sentenceText);

	return (
		<span className="RenderedText-sentence">
			{sentenceArray.map((word, i) => {
				return <Word key={i} wordObject={word} updateModalText={updateModalText} sentenceText={sentenceText} />;
			})}
		</span>
	);
}
