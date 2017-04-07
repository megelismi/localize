import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import RequiresAuth from './components/auth/requires_auth';
import RememberUser from './components/auth/remember_user';
import MapDisplay from './components/pages/map_display';
import NewMapDisplay from './components/pages/new_map_display';
import UserAccountPage from './components/pages/user_account';
import UserMapDisplay from './components/pages/user_map_display';
import HomePage from './components/pages/home_page';
import store from './store';

const routes = (
  <Provider store={store}>
		<Router history={hashHistory}>

			<Route path='/map/portland' component={RememberUser(MapDisplay)} />
			<Route path='/newmap/:id' component={RequiresAuth(NewMapDisplay)} />
      <Route path='/usermap/:id' component={RequiresAuth(UserMapDisplay)} />
      <Route path='/account' component={RequiresAuth(UserAccountPage)} />
			<Route path='/' component={HomePage} />

		</Router>
  </Provider>
);

ReactDOM.render(
	routes,
	document.getElementById('root')
);

console.log(`Client running in ${process.env.NODE_ENV} mode`);
