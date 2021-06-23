import React from 'react';
// import { v4 as uuid } from 'uuid';
// import { makeStyles } from '@material-ui/core/styles';
// import Button from '@material-ui/core/Button';
// import styled from 'styled-components'
import './RenderedText.css';
// import VocabComponentFormModal from './VocabComponentFormModal';

export default function Word({ wordObject, updateModalText }) {
	const wordClassName = `RenderedText-Word-${wordObject.type}`;

	if (wordObject.type === 'space') {
		return <span className={wordClassName} />;
	}

	if (wordObject.type === 'ignore') {
		return <span className={wordClassName}>{wordObject.text}</span>;
	}

	// return <VocabComponentFormModal buttonText={wordObject.text} wordClassName={wordClassName} />;

	return (
		<span onClick={() => updateModalText({ text: wordObject.text })} className={wordClassName}>
			{wordObject.text}
		</span>
	);
}
