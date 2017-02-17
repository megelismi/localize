import React from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

const MarkerLayer = (props) => {

  return (
    <LayerGroup>{
        props.locationInfo.map((location, index) => {
          console.log(location);
          return <Marker position={[location.lat_long.lat, location.lat_long.lng]} key={index}>
            <Popup>
              <span className="popup-info">
                <p className="location-name">{location.feature.properties.name}</p>
              </span>
            </Popup>
          </Marker>
        })
      }
    </LayerGroup>
  )
}

export default MarkerLayer;
