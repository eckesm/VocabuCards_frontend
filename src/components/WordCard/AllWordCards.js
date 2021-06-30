import React from 'react';
import { useSelector } from 'react-redux';
import './WordCard.css';
import WordCard from './WordCard';

export default function VocabWordsAll() {
	const { words_array } = useSelector(store => store);

	return (
		<div className="AllWordCards">
			<h1>Vocabulary Words</h1>
			<div className="AllWordCards-container">
				{words_array &&
					words_array.map(word => {
						return <WordCard key={word['id']} word={word} />;
					})}
			</div>
		</div>
	);
}
