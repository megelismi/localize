import React from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

const MarkerLayer = (props) => {
  console.log('MarkerLayer', props);
  return (
    <LayerGroup>{
        props.selectedResults.map((location, index) => {
          return <Marker position={[location.lat_long.lat || location.lat_long[0], location.lat_long.lng || location.lat_long[1]]} key={index}>
            <Popup>
              <span className="popup-info">
                <p className="location-name">{location.name}</p>
              </span>
            </Popup>
          </Marker>
        })
      }
    </LayerGroup>
  )
}

export default MarkerLayer;
