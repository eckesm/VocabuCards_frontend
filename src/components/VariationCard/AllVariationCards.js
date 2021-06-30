import React from 'react';

import VariationCard from './VariationCard';

import './VariationCard.css';

export default function AllVariationCards({ variations }) {
	return (
		<div className="AllVariationCards">
			<div className="AllVariationCards-container">
				{variations &&
					variations.map(variation => {
						return <VariationCard key={variation['id']} variation={variation} />;
					})}
			</div>
		</div>
	);
}
