import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from '../Login/LoginForm';
import RenderTextScreen from '../RenderedText/RenderTextScreen';
import VocabWordsAll from '../VocabWords/VocabWordsAll';
import Home from '../Home';
import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteScreen from './ProtectedRouteScreen';

export default function Routes() {
	return (
		<Switch>
			<Route exact path="/">
				<Home />
			</Route>

			<Route exact path="/login">
				<LoginForm />
			</Route>

			<ProtectedRoute component={RenderTextScreen} path="/read" exact />

			<ProtectedRoute component={VocabWordsAll} path="/words" exact />

			<Route exact path="/restricted">
				<ProtectedRouteScreen />
			</Route>

			<Redirect to="/" />
		</Switch>
	);
}
