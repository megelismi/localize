import React from 'react';

const LocationDetailsDisplay = (props) => {

  return (
 		<div className="location-details-container">
      <button className="close-button" onClick={() => {props.selectLocationById(null)}}>
        <i className="fa fa-window-close" aria-hidden="true"></i>
      </button>
      <div className="selected-location-name">{props.locationInfo.name}</div>
      { props.locationInfo.image ? <img className="location-image" src={props.locationInfo.image} /> : null }
      <div className="selected-location-info">{props.locationInfo.long_description}</div>
     </div>
  )
}

export default LocationDetailsDisplay;
