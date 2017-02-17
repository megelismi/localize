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
    const searchBox = L.control.geocoder('mapzen-DyNizkF');

    searchBox.on('select', e => {
      this.props.getSearchResults(e.feature, e.latlng);
    });

    this.leafletElement = searchBox;
  }

}

export default connect(null, syncActionCreators)(PlacesSearch);
