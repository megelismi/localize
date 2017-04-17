import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { LayerGroup, Marker, Popup } from 'react-leaflet';
import * as syncActionCreators from '../../../actions/sync.js';
import * as postActionCreators from '../../../actions/post_request'; 

const MarkerLayer = (props) => {
  function selectLocationById(locationId) {
    props.syncActionCreators.selectLocationById(locationId); 
    props.postActionCreators.getSelectedLocationReviews(locationId); 
  }

  return (
    <LayerGroup>{
        props.locationInfo.map((location, index) => {
          return (<Marker position={location.lat_long} key={index}>
            <Popup>
              <span className="popup-info">
                <p className="location-name">{location.name}</p>
                <p className="location-short-description">{location.short_description}</p>
                <button className="see-location-details-button" onClick={() => { selectLocationById(location.id); }}>See reviews</button>
              </span>
            </Popup>
          </Marker>);
        })
      }
    </LayerGroup>
  );
};


const mapDispatchToProps = dispatch => {
  return {
    postActionCreators: bindActionCreators(postActionCreators, dispatch),
    syncActionCreators: bindActionCreators(syncActionCreators, dispatch)
  };
};

export default connect(null, mapDispatchToProps)(MarkerLayer);
