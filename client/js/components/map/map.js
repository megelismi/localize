import React from 'react';
import { Map, LayersControl } from 'react-leaflet';
import { connect } from 'react-redux';
import * as actionCreators from '../../actions/get_request.js';
import L from 'leaflet';
import Tile from './tile_layer';
import MarkerLayer from './marker_layer';
L.Icon.Default.imagePath = '../assets/images/';
import mergeLocationAndDescription from '../logic/merge_location';
import filteredPins from '../logic/filtered_pins';

class MapComponent extends React.Component {

  componentDidMount() {
    this.props.getLocations();
    this.props.getDescriptions();
    this.props.getLocationTags();
    this.props.getUsers();
  }

  render() {
    const city = [43.6615, -70.2553];
    const { locations, descriptions, selectedTags, locationTags, filter } = this.props.locationState;
    if (!locations || !descriptions) {
      return <div></div>
    } else {
      let locationPins;
      let mergedLocations = mergeLocationAndDescription(locations, descriptions);
      !filter ? locationPins = mergedLocations : locationPins = filteredPins(selectedTags, locationTags, mergedLocations);
      return (
        <Map className="display-map" center={city} zoom={14}>
          <Tile />
          <MarkerLayer locationInfo={locationPins} />
        </Map>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  locationState: state.locationState
});

export default connect(mapStateToProps, actionCreators)(MapComponent);
