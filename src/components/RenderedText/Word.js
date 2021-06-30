import React from 'react';

import './RenderedText.css';

export default function Word({ wordObject, updateModalText }) {
	const wordClassName = `RenderedText-Word-${wordObject.type}`;

	if (wordObject.type === 'space') {
		return <span className={wordClassName} />;
	}

	if (wordObject.type === 'ignore') {
		return <span className={wordClassName}>{wordObject.text}</span>;
	}

	return (
		<span onClick={() => updateModalText({ text: wordObject.text })} className={wordClassName}>
			{wordObject.text}
		</span>
	);
}
