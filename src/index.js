import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducers/root';
import rootReducer from './rootReducer';
import { Provider } from 'react-redux';
import { BrowserRouter,HashRouter } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';

// const access_token = localStorage.getItem('access_token') || null;

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		{/* <BrowserRouter> */}
		<HashRouter>
			<App />
		{/* </BrowserRouter> */}
		</HashRouter>
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
