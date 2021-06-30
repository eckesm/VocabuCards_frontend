import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from '../Login/LoginForm';
import RenderTextScreen from '../RenderedText/RenderTextScreen';
import VocabWordsAll from '../WordCard/AllWordCards';
import Home from '../Home';
import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteScreen from './ProtectedRouteScreen';
import WordDetail from '../WordDetail/WordDetail';

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

			<Route
				// component={VocabCardDetail}
				path="/words/:rootId"
				exact
			>
				<WordDetail />
			</Route>

			<Redirect to="/" />
		</Switch>
	);
}
