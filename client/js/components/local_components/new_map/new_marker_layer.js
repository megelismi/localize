import React from 'react';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

const MarkerLayer = (props) => {
  console.log('MarkerLayer', props);
  return (
    <LayerGroup>{
        props.selectedResults.map((review, index) => {
          return (<Marker position={[review.locationInfo.lat_long.lat || review.locationInfo.lat_long[0], review.locationInfo.lat_long.lng || review.locationInfo.lat_long[1]]} key={index}>
            <Popup>
              <span className="popup-info">
                <p className="location-name">{review.locationInfo.name}</p>
              </span>
            </Popup>
          </Marker>);
        })
      }
    </LayerGroup>
  );
};

export default MarkerLayer;
