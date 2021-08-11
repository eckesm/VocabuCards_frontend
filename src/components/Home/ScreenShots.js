import React from 'react';

import ScreenShotCard from './ScreenShotCard';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	container : {

		backgroundColor : 'rgba(255,255,255,0.75)',
		marginTop       : '100px',
		padding         : '10px'
	},
	title     : {
		fontFamily : 'roboto, sans-serif',
		fontSize   : '2rem'
	},
	allCards  : {
		display        : 'flex',
		flexWrap       : 'wrap',
		justifyContent : 'space-around'

	}
}));

export default function Introductions() {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<h3 className={classes.title}>Screenshots</h3>
			<div className={classes.allCards}>
				<ScreenShotCard src="/static/ReactAppImages/Home.jpg" text="Study Foreign Text & Review Saved Words" />
				<ScreenShotCard src="/static/ReactAppImages/StudySwedishText.jpg" text="Study Foreign Text" />
				<ScreenShotCard
					src="/static/ReactAppImages/RenderedSwedishText.jpg"
					text="Click Words to Add to Your Database"
				/>
				<ScreenShotCard
					src="/static/ReactAppImages/AddVariationWord.jpg"
					text="Translate Words & Sentences from Text"
				/>
				<ScreenShotCard src="/static/ReactAppImages/NewFortsätter.jpg" text="Save New Words" />
				<ScreenShotCard src="/static/ReactAppImages/SavedFortsätter.jpg" text="New Words Saved in Database" />
				<ScreenShotCard
					src="/static/ReactAppImages/AddVariationFortsätter.jpg"
					text="Add Variations to Root Words Saved in Your Database"
				/>
				<ScreenShotCard src="/static/ReactAppImages/FortsätterRoot.jpg" text="Build Your Database & Improve Your Vocabulary" />
				<ScreenShotCard src="/static/ReactAppImages/ManySwedishRoots.jpg" text="Review Your Saved Words" />
				<ScreenShotCard src="/static/ReactAppImages/Menu.jpg" text="Logical Menu & Navigation" />
				<ScreenShotCard src="/static/ReactAppImages/Register.jpg" text="Easy Sign-Up Process" />
				<ScreenShotCard src="/static/ReactAppImages/GettingStarted.jpg" text="Straightforward Instructions" />
				<ScreenShotCard src="/static/ReactAppImages/StripeScreen.jpg" text="Simple Payment via Stripe" />
				{/* <ScreenShotCard src="/static/ReactAppImages/Login.jpg" text="Login Screen" /> */}
			</div>
		</div>
	);
}
