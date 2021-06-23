import React from 'react';
import Word from './Word';
import './RenderedText.css';

export default function Paragraph({ paragraphArray, updateModalText }) {
	return (
		<div className="RenderedText-Paragraph">
			{paragraphArray.map((wordObject, i) => {
				return <Word key={i} wordObject={wordObject} updateModalText={updateModalText} />;
			})}
		</div>
	);
}
