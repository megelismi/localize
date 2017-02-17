import React from 'react'
import { MapControl } from 'react-leaflet'

class PlacesSearch extends MapControl {

  componentWillMount() {
    const searchBox = L.control.geocoder('mapzen-DyNizkF')
    this.leafletElement = searchBox
  }

}

export default PlacesSearch;
