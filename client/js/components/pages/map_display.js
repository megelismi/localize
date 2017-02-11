import React from 'react';
import Map from '../map/map';
import NewSidebar from '../new_sidebar/new_sidebar';
import Header from '../partials/header';
import Footer from '../partials/footer';

const MapDisplay = () => {

    return (
      <div>
      	<Header />
        <Map />
        <NewSidebar />
        <Footer />
      </div>
    )
}

export default MapDisplay;
