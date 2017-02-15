import React from 'react';
import { Map, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import Tile from './new_tile_layer';
import MarkerLayer from './new_marker_layer';
L.Icon.Default.imagePath = '../assets/images/';

class CreateMap extends React.Component {

  render() {
    const city = [43.6615, -70.2553];
    return (
      <Map className="display-map" center={city} zoom={14}>
        <Tile />
        <MarkerLayer />
      </Map>
    );
  }
}

export default CreateMap;
