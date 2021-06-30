import React from 'react';

// import Link from '@material-ui/core/Link';

import './VariationCard.css';

export default function VariationCard({ variation }) {
	// const variationName = variation.variation;
	const translation = variation.translation === '' ? null : variation.translation;
	const description = variation.description === '' ? null : variation.description;
	const examples = variation.examples === '' ? null : variation.examples;
	const notes = variation.notes === '' ? null : variation.notes;

	return (
		<div className="VariationCard">
			<div className="VariationCard-heading">
				{/* <Link href={'/#/words/' + word.id} className="VariationCard-headingText">
					{word.root}
				</Link> */}
				<p className="VariationCard-headingText">{variation.variation}</p>
			</div>
			<div className="VariationCard-body">
				{translation && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Translation:</b> {translation}
						</p>
					</div>
				)}
				{description && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Description:</b> {description}
						</p>
					</div>
				)}
				{examples && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Examples: </b> {examples}
						</p>
					</div>
				)}
				{notes && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Notes: </b> {notes}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
