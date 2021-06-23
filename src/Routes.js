import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RenderTextScreen from './components/RenderedText/RenderTextScreen';
import VocabWordsAll from './components/VocabWords/VocabWordsAll';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/login">
				<LoginForm />
			</Route>
			<Route exact path="/read">
				<RenderTextScreen />
			</Route>
			<Route exact path="/words/languages/:language">
				<VocabWordsAll />
			</Route>
			<Route exact path="/logout">
				<LoginForm doLogout={true} />
			</Route>
			<Redirect to="/login" />
		</Switch>
	);
}
