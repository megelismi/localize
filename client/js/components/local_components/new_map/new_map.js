import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { Map, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-geocoder-mapzen';
import Geocoder from 'react-select-geocoder'
import Tile from './new_tile_layer';
import MarkerLayer from './new_marker_layer';
import PlacesSearch from './places_search'
L.Icon.Default.imagePath = '../assets/images/';

class CreateMap extends React.Component {
  constructor() {
    super();
  }

  render() {
    const city = [43.6615, -70.2553];
    return (
      <div id="insert-search">
          <Map className="display-map" center={city} zoom={14}>
            <PlacesSearch currentUser={this.props.currentUser}/>
            <Tile />
            <MarkerLayer selectedResults={this.props.localsMapLocations}/>
          </Map>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  localsMapLocations: state.localsMapLocations,
  currentUser: state.currentUser
});

export default connect(mapStateToProps)(CreateMap);
