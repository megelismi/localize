import React from 'react';
import Map from '../map/map';
import Sidebar from '../sidebar/sidebar';
import Header from '../partials/header';
import Footer from '../partials/footer';

const MapDisplay = () => {

    return (
      <div>
      	<Header />
        <Map />
        <Sidebar />
        <Footer />
      </div>
    )
}

export default MapDisplay;
