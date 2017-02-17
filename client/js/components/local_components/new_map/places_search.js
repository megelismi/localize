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
    let _this = this;
    const searchBox = L.control.geocoder('mapzen-DyNizkF');
    this.leafletElement = searchBox;
    searchBox.on('select', function (e) {
      _this.props.getSearchResults(e.feature, e.latlng);
    });
  }

}

export default connect(null, syncActionCreators)(PlacesSearch);
