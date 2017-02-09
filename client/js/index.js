import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
// import Map from './components/map/map';
// import Sidebar from './components/sidebar/sidebar';
import MapDisplay from './components/pages/map_display';

ReactDOM.render(
  <Provider store={store}>
    <MapDisplay />
  </Provider>,
  document.getElementById('root')
);

console.log(`Client running in ${process.env.NODE_ENV} mode`);
