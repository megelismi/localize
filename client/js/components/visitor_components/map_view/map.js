import React from 'react';
import { Map, LayersControl } from 'react-leaflet';
import { connect } from 'react-redux';
import * as syncActionCreators from '../../../actions/sync.js';
import L from 'leaflet';
import Tile from './tile_layer';
import MarkerLayer from './marker_layer';
L.Icon.Default.imagePath = '../assets/images/';

class MapComponent extends React.Component {

  render() {
    const city = [43.6615, -70.2553];
    const { selectedLocations, allLocationsAndDescriptions, locationsFilteredByUser } = this.props;
    if (!allLocationsAndDescriptions) {
      return <div></div>
    } else {
      let locations;
      if (selectedLocations && selectedLocations.length > 0) {
        locations = selectedLocations
      } else if (locationsFilteredByUser && locationsFilteredByUser.length > 0) {
        locations = locationsFilteredByUser
      } else {
        locations = allLocationsAndDescriptions
      }
      return (
        <Map className="display-map" center={city} zoom={14}>
          <Tile />
          <MarkerLayer locationInfo={locations} />
        </Map>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  selectedLocations: state.selectedLocations,
  locationsFilteredByUser: state.locationsFilteredByUser,
  allLocationsAndDescriptions: state.allLocationsAndDescriptions
});

export default connect(mapStateToProps, syncActionCreators)(MapComponent);
