import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import store from './store';
import MapDisplay from './components/pages/map_display';
import UserDisplay from './components/sidebar/user_display';

const routes = (
  <Provider store={store}>
		<Router history={hashHistory}>
			<Route path = '/' component={MapDisplay} />
      <Route path = '/:user_id' component={UserDisplay} />
		</Router>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
	return ReactDOM.render(
		routes,
		document.getElementById('root')
	);
});

console.log(`Client running in ${process.env.NODE_ENV} mode`);
