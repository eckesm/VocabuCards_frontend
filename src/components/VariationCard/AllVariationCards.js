import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import VariationCard from './VariationCard';

import './VariationCard.css';

// export default function AllVariationCards({ variations,pos,wordId }) {
export default function AllVariationCards({ pos, wordId }) {
	const { words_array } = useSelector(store => store);
	const [ variations, setVariations ] = useState([]);

	useEffect(
		() => {
			const word = words_array.filter(w => w.id === wordId)[0];
			setVariations(word.components.filter(c => c.part_of_speech === pos));
		},
		[ words_array ]
	);

	return (
		<div className="AllVariationCards">
			<div className="AllVariationCards-container">
				{variations &&
					variations.map(variation => {
						return <VariationCard key={variation['id']} initialVariation={variation} />;
					})}
			</div>
		</div>
	);
}
