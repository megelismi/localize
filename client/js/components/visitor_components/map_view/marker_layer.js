import React from 'react';
import { connect } from 'react-redux';
import * as actionCreators from '../../../actions/sync.js';
import { LayerGroup, Marker, Popup } from 'react-leaflet';

const MarkerLayer = (props) => {

  //if there's a selected user id, then filter then the locations and save it to variable
  //else 

  // let locations = store.locations;

  return (
    <LayerGroup>{
        props.locationInfo.map((location, index) => {
          return <Marker position={location.lat_long} key={index}>
            <Popup>
              <span className="popup-info">
                <p className="location-name">{location.name}</p>
                <p className="location-short-description">{location.short_description}</p>
                <button className="see-location-details-button" onClick={() => {props.selectLocationById(location.id)}}>See details</button>
              </span>
            </Popup>
          </Marker>
        })
      }
    </LayerGroup>
  )
}

export default connect(null, actionCreators)(MarkerLayer);
