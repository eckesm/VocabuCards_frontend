import React, { useState } from 'react';
import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router';

import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

import VocabModal from '../VocabForms/VocabModal';

const useStyles = makeStyles(theme => ({
	container      : {
		// marginTop    : '25px',
		// marginBottom : '25px'
	},
	// button         : {
	// 	marginTop   : '15px',
	// 	marginLeft  : '5px',
	// 	marginRight : '5px'
	// },
	// select         : {
	// 	marginTop : '25px'
	// },
	listContainer  : {
		// position:'flex',
	},
	list           : {
		marginLeft  : 'auto',
		marginRight : 'auto',
		textAlign   : 'left'
		// width     : '300px'
	},
	listCompressed : {
		marginLeft  : 'auto',
		marginRight : 'auto',
		textAlign   : 'left',
		width       : '300px'
	},
	textContainer  : {
		textAlign : 'left'
	}
}));

export default function Instructions() {
	const classes = useStyles();
	// const history = useHistory();
	// const { user, language, language_object, subscription_status } = useSelector(store => store);
	// const { user, subscription_status } = useSelector(store => store);
	const { user } = useSelector(store => store);
	// const languageName = language_object[language];

	const [ modalOpen, setModalOpen ] = useState(false);
	const handleModalOpen = () => {
		setModalOpen(true);
	};
	const handleModalClose = () => {
		setModalOpen(false);
	};

	return (
		<div className={classes.container}>
			<h2>Adding a word</h2>
			<p className={classes.textContainer}>
				VocabuCards are structured around roots and variations of roots. For example, you might build a
				VocabuCard for the root word "plant" and include the following variations of the root:{' '}
			</p>
			<div className={classes.listContainer}>
				<ul className={classes.listCompressed}>
					<li>
						a plant <i>(noun, singular indefinite)</i>
					</li>
					<li>
						the plant <i>(noun, singular definite)</i>
					</li>
					<li>
						plants <i>(noun, plural indefinite)</i>
					</li>
					<li>
						the plants <i>(noun, plural definite)</i>
					</li>
					<li>
						to plant <i>(verb, present)</i>
					</li>
					<li>
						planted <i>(verb, past simple)</i>
					</li>
					{/* <li>was/were planting <i>(verb, past continuous)</li</i>> */}
					<li>
						had planted <i>(verb, past perfect)</i>
					</li>
					{/* <li>had been planting <i>(verb, past perfect continuous)<</i>/li> */}
					<li>
						plant-like <i>(adjective)</i>
					</li>
				</ul>
			</div>
			<p className={classes.textContainer}>
				You can add a new root word or variation of a root word by clicking the{' '}
				<b>
					{/* {user && subscription_status !== 'expired' ? ( */}
					{user ? <Link onClick={handleModalOpen}>Add Word</Link> : 'Add Word'}
				</b>{' '}
				button.
			</p>

			<p className={classes.textContainer}>
				Click the{' '}
				<b>
					{/* {user && subscription_status !== 'expired' ? <Link href="/#/study-text">Study Text</Link> : 'Study Text'} */}
					<Link href={user ? '/#/study-text' : '/#/'}>Study Text</Link>
				</b>{' '}
				button to render an interactive version of foreign text. Either:
			</p>
			<div className={classes.listContainer}>
				<ol className={classes.list}>
					<li>
						Copy and paste or manually type foreign language text into the input box and click the{' '}
						<b>Render Pasted/Entered Text</b> button.
					</li>
					<li>
						For some languages, full or partial foreign language news articles can be imported--click the{' '}
						<b>Get Article...</b> button to get a random article.
					</li>
				</ol>
			</div>
			<p className={classes.textContainer}>
				After the text renders, you will be able to click on each word individually to add it to your VocabuCard
				database, see a translation, or edit an existing word in your database.
			</p>
			<h2>Your VocabuCards</h2>
			<p className={classes.textContainer}>
				Click the{' '}
				<b>
					{/* {user && subscription_status !== 'expired' ? ( */}
					{user ? <Link href="/#/words">My VocabuCards</Link> : 'My VocabuCards'}
				</b>{' '}
				button to see all of your cards for your current language setting. You can add new roots and variations
				on this page, make changes to existing roots and variations, and delete roots and variations on this
				page.
			</p>
			<h2>Languages</h2>
			<p className={classes.textContainer}>
				You can study text and store VocabuCards in any available language. Select a language in the "Change
				Language" select input in the menu and on the{' '}
				{/* <b>{user && subscription_status !== 'expired' ? <Link href="/#/home">Home</Link> : 'Home'}</b> page. */}
				<b>{user ? <Link href="/#/home">Home</Link> : 'Home'}</b> page.
			</p>
			<p className={classes.textContainer}>
				When you change languages, you will only see your VocabuCards that are stored in the new language. When
				you access a new language for the first time, you may see some automatically generated starter cards in
				your database.
			</p>
			{modalOpen && (
				<VocabModal open={modalOpen} handleClose={handleModalClose} setting="add_variation_or_root" />
			)}
		</div>
	);
}
