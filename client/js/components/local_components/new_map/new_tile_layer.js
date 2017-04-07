import React from 'react';
import { TileLayer } from 'react-leaflet';

const Tile = () => {
  return (
    <TileLayer
      url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    />
  );
};

export default Tile;
