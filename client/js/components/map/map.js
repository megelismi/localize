import React from 'react';
import { Map, LayersControl } from 'react-leaflet';
import { connect } from 'react-redux';
import L from 'leaflet';
import Tile from './tile_layer';
import MarkerLayer from './marker_layer';
L.Icon.Default.imagePath = '../assets/images/';
import mergeLocationAndDescription from '../logic/merge_location';
import filteredPins from '../logic/filtered_pins';

class MapComponent extends React.Component {

  render() {
    const city = [43.6615, -70.2553];
    const { locations, selectedTags, locationTags, filterBoolean, locationAndDescription } = this.props;
    if (!locations || !locationAndDescription) {
      return <div></div>
    } else {
      return (
        <Map className="display-map" center={city} zoom={14}>
          <Tile />
          <MarkerLayer locationInfo={locationAndDescription} />
        </Map>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  locations: state.locationState.locations,
  locationAndDescription: state.locationState.locationAndDescription,
  selectedTags: state.tagState.selectedTags,
  locationTags: state.tagState.locationTags
});

export default connect(mapStateToProps)(MapComponent);
