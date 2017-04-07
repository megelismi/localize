import React from 'react';
import { Map } from 'react-leaflet';
import { connect } from 'react-redux';
import L from 'leaflet';
import Tile from './tile_layer';
import MarkerLayer from './marker_layer';

L.Icon.Default.imagePath = '../assets/images/';

class MapComponent extends React.Component {

  render() {
    const city = [43.6615, -70.2553];
    const { filteredLocations } = this.props; 

    if (!filteredLocations) {
      return <div />;
    }

    return (
      <Map className="display-map" center={city} zoom={14}>
        <Tile />
        <MarkerLayer locationInfo={filteredLocations} />
      </Map>
    );
  }
}

const mapStateToProps = (state) => ({
  filteredLocations: state.filteredLocations
});

export default connect(mapStateToProps)(MapComponent);
