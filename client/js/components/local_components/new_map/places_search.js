import React from 'react';
import { MapControl } from 'react-leaflet';

class PlacesSearch extends MapControl {

  componentWillMount() {
    const searchBox = L.control.geocoder('mapzen-DyNizkF');
    this.leafletElement = searchBox;
    // searchBox.on('place', function (e) {
    //   console.log('place', e);
    // });
    searchBox.on('select', function (e) {
      console.log('select', e);
    });
  }

}

export default PlacesSearch;
