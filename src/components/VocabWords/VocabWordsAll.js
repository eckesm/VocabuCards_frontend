import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { updateUserLastLanguageViaAPI, getUserLanguageWordsViaAPI, setUserLanguage } from '../../actions/vocab';
import './VocabWords.css';

import VocabWordCard from './VocabWordCard';

export default function VocabWordsAll() {
	// const newLanguage = useParams().language;
	const { language, words_array } = useSelector(store => store);
	// const words_array = useSelector(store => store.words_array[language]);
	// console.log(newLanguage)
	// const [ language, setLanguage ] = useState(newLanguage);
	// const dispatch = useDispatch();

	// useEffect(
	// 	() => {
	// 		setLanguage(newLanguage);
	// 		dispatch(setUserLanguage(language));
	// 		dispatch(updateUserLastLanguageViaAPI(language));
	// 		dispatch(getUserLanguageWordsViaAPI(language));
	// 	},
	// 	[]
	// );

	return (
		<div className="VocabWordsAll">
			<h1>Vocabulary Words</h1>
			<div className='VocabWordsAll-container'>
				{words_array &&
					words_array.map(word => {
						return <VocabWordCard key={word['id']} word={word} />;
					})}
			</div>
		</div>
	);
}
