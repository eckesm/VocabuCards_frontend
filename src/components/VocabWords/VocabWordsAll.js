import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { useHistory, useParams } from 'react-router';
import {useParams } from 'react-router';

import VocabWordCard from './VocabWordCard';

export default function VocabWordsAll() {
	// const { language } = useSelector(store => store);
	const { language } = useParams();
	// console.log(language);
	const words_array = useSelector(store => store.words_array[language]);
	// const dispatch = useDispatch();
	// const history = useHistory();

	return (
		<div>
			<h1>Vocabulary Words</h1>
			{words_array &&
				words_array.map(word => {
					return <VocabWordCard key={word['id']} word={word} />;
				})}
		</div>
	);
}
