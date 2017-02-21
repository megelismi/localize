import React from 'react';
import { connect } from 'react-redux';
import { MapControl } from 'react-leaflet';
import * as syncActionCreators from '../../../actions/sync.js';

class PlacesSearch extends MapControl {
  constructor() {
    super();
    this.state = { content: '' }
  }

  componentWillMount(props) {
    const options = {
      focus: [43.6615, -70.2553],
      markers: false
    };
    const searchBox = L.control.geocoder('mapzen-DyNizkF', options);
    searchBox.on('select', e => {
      this.props.addLocationToLocalsMap(this.props.currentUser.id, e.feature, e.latlng);
    });
    searchBox.on('error', e => console.error('An error occured with the search:', e.errorMessage));
    this.leafletElement = searchBox;
  }

}

export default connect(null, syncActionCreators)(PlacesSearch);
