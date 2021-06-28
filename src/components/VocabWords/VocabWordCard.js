import React from 'react';
import './VocabWords.css';

export default function VocabWordCard({ word }) {
	return (
		<div className="VocabWordCard">
			<div className="VocabWordCard-heading">
				<p className='VocabWordCard-headingText'>{word.root}</p>
			</div>
			<div className="VocabWordCard-body">
				<div className="VocabWordCard-section">
					<p className="VocabWordCard-title">Variations</p>
					<ul>
						{word.components.map(component => {
							return <li key={component.id}>{component.variation}</li>;
						})}
					</ul>
				</div>
				<div className="VocabWordCard-section">
					<p className="VocabWordCard-title">Translation</p>
					<p className="VocabWordCard-content">{word.translation}</p>
				</div>
				<div className="VocabWordCard-section">
					<p className="VocabWordCard-title">Definition</p>
					<p className="VocabWordCard-content">{word.definition}</p>
				</div>
				<div className="VocabWordCard-section">
					<p className="VocabWordCard-title">Examples</p>
					<p className="VocabWordCard-content">{word.examples}</p>
				</div>
			</div>
		</div>
	);
}
