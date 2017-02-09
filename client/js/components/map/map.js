import React from 'react';
import { Map, LayersControl } from 'react-leaflet';
import { connect } from 'react-redux';
import { getLocations, getLocationTags, getDescriptions } from '../../actions/get_request.js';
import L from 'leaflet';
import Tile from './tile_layer';
import MarkerLayer from './marker_layer';
L.Icon.Default.imagePath = '../assets/images/';
import mergeLocationAndDescription from '../logic/merge_location';
import filteredPins from '../logic/filtered_pins';

class MapComponent extends React.Component {

  render() {
    const portland = [43.6615, -70.2553];
    const { locations, descriptions, getLocations, getDescriptions, getLocationTags } = this.props;
    if (!locations || !descriptions) {
      getLocations();
      getDescriptions();
      getLocationTags();
      return <div></div>
    } else {
      const { selectedTags, locationTags, filter } = this.props;
      let locationPins;
      let mergedLocations = mergeLocationAndDescription(locations, descriptions);
      !filter ? locationPins = mergedLocations : locationPins = filteredPins(selectedTags, locationTags, mergedLocations);
      return (
        <Map className="display-map" center={portland} zoom={14}>
          <Tile />
          <MarkerLayer locationInfo={locationPins} />
        </Map>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  locations: state.locationState.locations,
  descriptions: state.locationState.descriptions,
  selectedTags: state.locationState.selected_tags,
  locationTags: state.locationState.location_tags,
  filter: state.locationState.filter
});

const mapDispatchToProps = (dispatch) => {
  return {
    getLocations: () => { dispatch(getLocations()) },
    getLocationTags: () => { dispatch(getLocationTags()) },
    getDescriptions: () => { dispatch(getDescriptions()) }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent);
