import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import SignUpForm from './components/auth/signup';
import SignInForm from './components/auth/signin'; 

import store from './store';
import MapDisplay from './components/pages/map_display';

const routes = (
  <Provider store={store}>
		<Router history={hashHistory}>
			<Route path = '/' component={MapDisplay} />
		</Router>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
	return ReactDOM.render(
		<Provider store={store}>
			<SignInForm />
		</Provider>,
		document.getElementById('root')
	);
});

console.log(`Client running in ${process.env.NODE_ENV} mode`);
