import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

import VocabForm from '../VocabForms/VocabForm';

import './VariationCard.css';

export default function VariationCard({ variation }) {
	const translation = variation.translation === '' ? null : variation.translation;
	const description = variation.description === '' ? null : variation.description;
	const definition = variation.definition === '' ? null : variation.definition;
	const synonyms = variation.synonyms === '' ? null : variation.synonyms;
	const examples = variation.examples === '' ? null : variation.examples;
	const notes = variation.notes === '' ? null : variation.notes;

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<div className="VariationCard">
			<div className="VariationCard-heading">
				<p className="VariationCard-headingText">{variation.variation}</p>
				<ButtonGroup variant="text" size="small" aria-label="small text primary button group">
					<Button color="primary" onClick={handleModalOpen}>
						<i class="fad fa-pencil" />
					</Button>
					<Button color="secondary">
						<i class="fad fa-trash-alt" />
					</Button>
				</ButtonGroup>
			</div>
			{modalOpen && <VocabForm open={modalOpen} handleClose={handleModalClose} variation={variation} />}
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
				{definition && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Definition:</b> {definition}
						</p>
					</div>
				)}
				{synonyms && (
					<div className="VariationCard-section">
						<p className="VariationCard-content">
							<b>Synonyms:</b> {synonyms}
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
