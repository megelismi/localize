import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import MapComponent from './map';

ReactDOM.render(
  <MapComponent />,
  document.getElementById('root')
);


console.log(`Client running in ${process.env.NODE_ENV} mode`);
