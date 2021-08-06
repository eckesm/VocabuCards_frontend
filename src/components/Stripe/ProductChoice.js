import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root     : {
		minWidth : 275
	},
	selected : {
		minWidth        : 275,
		backgroundColor : 'lightBlue'
	},
	title    : {
		fontSize : '1.2REM'
	}
});

export default function ProductChoice({ planObject, selected = false }) {
	const classes = useStyles();
	const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={selected === false ? classes.selected : classes.root} variant="outlined">
			<CardContent>
				<Typography className={classes.title}>{planObject.title}</Typography>
				<Typography variant="body2" component="p">
					<i>{planObject.message}</i>
				</Typography>
			</CardContent>
		</Card>
	);
}
