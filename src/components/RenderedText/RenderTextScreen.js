import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { renderHtml } from '../../helpers/renderingText';
import { TextField, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { setTextInput } from '../../actions/vocab';
import { updateSavedRenderedText } from '../../helpers/API';
import { getRSSFeed, RSSNewsSources } from '../../helpers/newsSources';
import useLocalStorageState from '../../hooks/useLocalStorageState';

import Paragraph from './Paragraph';
import VocabModal from '../VocabForms/VocabModal';

const useStyles = makeStyles(theme => ({
	root             : {
		'& > *'      : {
			width                          : '97%',
			// margin : theme.spacing(1),
			[theme.breakpoints.down('sm')]: {
				margin : '5px'
			},
			[theme.breakpoints.up('md')]: {
				margin : '15px'
			},
			[theme.breakpoints.up('lg')]: {
				margin : '25px'
			}
		},
		marginBottom : '30px'
	},
	renderTextScreen : {
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		backgroundColor                : 'snow',
		[theme.breakpoints.down('sm')]: {
			margin : '5px'
		},
		[theme.breakpoints.up('md')]: {
			margin    : '15px',
			boxShadow : '5px 5px 8px grey'
		},
		[theme.breakpoints.up('lg')]: {
			margin : '25px'
		}
	},
	renderTextOutput : {
		border                         : '1px solid rgb(200, 200, 200)',
		borderRadius                   : '3px',
		fontFamily                     : 'roboto, sans-serif',
		backgroundColor                : 'snow',
		padding                        : '15px',
		textAlign                      : 'left',
		fontSize                       : '1.5rem',
		[theme.breakpoints.down('sm')]: {
			margin    : '5px',
			marginTop : '0px'
		},
		[theme.breakpoints.up('md')]: {
			margin    : '15px',
			marginTop : '0px'
		},
		[theme.breakpoints.up('lg')]: {
			margin    : '25px',
			marginTop : '0px'
		}
	},
	empty            : {
		textAlign : 'center'
	},
	button           : {
		width     : '350px',
		margin    : '10px',
		minHeight : '50px'
	},
	rssTextOutput    : {
		borderBottom  : '1px solid rgb(200, 200, 200)',
		paddingBottom : '15px',
		marginBottom  : '15px'
	},
	title            : {
		fontSize     : '2rem',
		fontWeight   : 'bold',
		marginTop    : '5px',
		marginBottom : '5px'
	},
	author           : {
		fontSize     : '1.5rem',
		marginTop    : '0px',
		marginBottom : '5px'
	},
	link             : {
		fontSize  : '1.0rem',
		marginTop : '0px'
	}
}));

export default function RenderTextScreen() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { text_input, language, language_object } = useSelector(store => store);
	const translate_code = 'en';
	const source_code = language;

	const [ renderedText, setRenderedText ] = useState([]);
	const [ modalText, setModalText ] = useState(null);

	const [ formData, setFormData ] = useState({
		foreignText : ''
	});

	const [ rssObject, setRssObject ] = useLocalStorageState('rss_object', '');
	const [ rssSource, setRssSource ] = useState(null);
	const [ enableRss, setEnableRss ] = useState(false);
	const [ initialLanguage, setInitialLanguage ] = useState(null);

	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(data => ({
			...data,
			[name] : value
		}));
	}

	async function handleGetArticle() {
		const res = await getRSSFeed(language);
		setRssObject(res);

		setFormData({
			...formData,
			foreignText : res.text
		});

		renderAndSaveText(res.text);
	}

	function handleSubmit(evt) {
		evt.preventDefault();
		setRssObject('');
		renderAndSaveText(formData.foreignText);
	}

	function renderAndSaveText(text) {
		updateSavedRenderedText(text);
		dispatch(setTextInput(text));

		let prepareRenderedText = renderHtml(text, source_code, translate_code);
		setRenderedText(prepareRenderedText);
	}

	function updateModalText(wordObject) {
		setModalText(wordObject);
		setOpen(true);
	}

	const [ open, setOpen ] = useState(false);
	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(
		() => {
			setEnableRss(false);
			if (language) {
				if (initialLanguage !== null) {
					if (language !== initialLanguage) {
						setRssObject('');
						setFormData({
							...formData,
							foreignText : ''
						});
						setRenderedText([]);
					}
				}
				if (initialLanguage === null) {
					setInitialLanguage(language);
				}

				if (RSSNewsSources.hasOwnProperty(language)) {
					setRssSource(RSSNewsSources[language]['source']);
					setEnableRss(true);
				}
			}
			if (text_input !== '' && text_input !== null) {
				setFormData({ ...formData, foreignText: text_input });
				let prepareRenderedText = renderHtml(text_input, source_code, translate_code);
				setRenderedText(prepareRenderedText);
			}
		},
		[ text_input, language ]
	);

	return (
		<div className={classes.renderTextScreen}>
			<h1>Study {language_object[language]} Text</h1>
			<form onSubmit={handleSubmit} className={classes.root}>
				<TextField
					id="foreignText"
					name="foreignText"
					label="Type or paste foreign language text"
					multiline
					rows={10}
					value={formData.foreignText}
					variant="outlined"
					onChange={handleChange}
				/>
				<div>
					<Button className={classes.button} variant="contained" type="submit" color="primary" size="large">
						Render Pasted/Entered Text
					</Button>
					{enableRss && (
						<Button
							className={classes.button}
							variant="contained"
							color="primary"
							onClick={() => {
								handleGetArticle();
							}}
							size="small"
						>
							Get Article: {rssSource}
						</Button>
					)}
				</div>
			</form>

			<div className={classes.renderTextOutput}>
				{enableRss &&
				rssObject !== '' && (
					<div className={classes.rssTextOutput}>
						{rssObject.title !== '' && <p className={classes.title}>{rssObject.title}</p>}
						{rssObject.author !== '' && <p className={classes.author}>{rssObject.author}</p>}
						{rssObject.link !== '' && (
							<a href={rssObject.link} target="_blank">
								<p className={classes.link}>{rssObject.link}</p>
							</a>
						)}
					</div>
				)}
				{renderedText.length === 0 && (
					<h4 className={classes.empty}>
						<i>
							...type or paste {language_object[language]} text into the input box then click RENDER to
							process...
						</i>
					</h4>
				)}

				{renderedText.length > 0 &&
					renderedText.map((paragraphArray, i) => {
						return <Paragraph key={i} paragraphArray={paragraphArray} updateModalText={updateModalText} />;
					})}
			</div>

			<VocabModal
				open={open}
				handleOpen={handleOpen}
				handleClose={handleClose}
				wordText={modalText}
				setting="add_variation_or_root"
			/>
		</div>
	);
}
