const IGNORED = [
	' ',
	'',
	'/',
	'.',
	',',
	'!',
	'@',
	'#',
	'-',
	'↵',
	'\n',
	'(',
	')',
	'"',
	'”',
	'[',
	']',
	'{',
	'}',
	'0',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'$',
	'%',
	'&',
	'*',
	'?',
	'<',
	'>',
	'+',
	'=',
	'_',
	'|',
	'–',
	':'
];

function splitString(unsplitString) {
	const splitList = [];
	let startPosition = 0;
	// let endPosition = 0;
	for (let charPosition = 0; charPosition < unsplitString.length; charPosition++) {
		if (IGNORED.indexOf(unsplitString[charPosition]) === -1) {
			// endPosition++
		}
		else {
			let word = unsplitString.slice(startPosition, charPosition);
			splitList.push(word);
			if (unsplitString[charPosition] !== ' ') {
				splitList.push(unsplitString[charPosition]);
			}
			else {
				splitList.push(' ');
			}
			startPosition = charPosition + 1;
		}
	}
	return splitList;
}

function refineSplitString(wordList) {
	if (wordList.length < 3) {
		return wordList;
	}

	for (let position = 2; position < wordList.length; position++) {
		let A = wordList[position - 2];
		let B = wordList[position - 1];
		let C = wordList[position];

		if (A === '\n' && B === '' && C === '\n') {
			wordList.splice(position - 1, 2);
			position = Math.max((position = 2), 0);
		}
	}
	return wordList;
}

export function renderHtml(pastedText, source_code, translate_code) {
	const unrefinedList = splitString(pastedText);
	const refinedList = refineSplitString(unrefinedList);
	const paragraphsArray = [];

	let paragraph = [];
	let sentence = [];
	for (let word of refinedList) {
		if (word === '\n') {
			paragraph.push(sentence);
			paragraphsArray.push(paragraph);
			sentence = [];
			paragraph = [];
		}
		else if (word === '.' || word === '!' || word === '?' || word === '–') {
			sentence.push({
				text : word,
				type : 'period'
			});
			paragraph.push(sentence);
			sentence = [];
		}
		else if (word === ' ') {
			sentence.push({
				text : ' ',
				type : 'space'
			});
		}
		else if (IGNORED.indexOf(word) === -1) {
			sentence.push({
				text           : word,
				type           : 'clickable',
				source_code,
				translate_code
			});
		}
		else {
			// paragraph.push({
			sentence.push({
				text : word,
				type : 'ignore'
			});
		}
	}
	paragraph.push(sentence);
	paragraphsArray.push(paragraph);

	return paragraphsArray;

	// updateClickableClickEvent();
	// updateClickableModals();
}
