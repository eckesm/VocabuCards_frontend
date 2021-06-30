import React from 'react';

import Link from '@material-ui/core/Link';

import './WordCard.css';

export default function WordCard({ word }) {
	const variations = word.components;
	const translation = word.translation === '' ? null : word.translation;
	const definition = word.definition === '' ? null : word.definition;
	const examples = word.examples === '' ? null : word.examples;
	const notes = word.notes === '' ? null : word.notes;

	return (
		<div className="WordCard">
			<div className="WordCard-heading">
				<Link href={'/#/words/' + word.id} className="WordCard-headingText">
					{word.root}
				</Link>
			</div>
			<div className="WordCard-body">
				{variations.length > 0 && (
					<div className="WordCard-section">
						<p className="WordCard-title">Variations</p>
						<ul>
							{variations.map(variation => {
								return <li key={variation.id}>{variation.variation}</li>;
							})}
						</ul>
					</div>
				)}
				{translation && (
					<div className="WordCard-section">
						<p className="WordCard-content">
							<b>Translation:</b> {translation}
						</p>
					</div>
				)}
				{definition && (
					<div className="WordCard-section">
						<p className="WordCard-content">
							<b>Definition:</b> {definition}
						</p>
					</div>
				)}
				{examples && (
					<div className="WordCard-section">
						<p className="WordCard-content">
							<b>Examples: </b> {examples}
						</p>
					</div>
				)}
				{notes && (
					<div className="WordCard-section">
						<p className="WordCard-content">
							<b>Notes: </b> {notes}
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
