import React from 'react';

const LocationDetailsDisplay = (props) => {

  return (
    <div className="sidebar-inner-container">
   		<div className="location-details-container">
	      <button className="close-button" onClick={() => {props.selectLocationById(null)}}>
	        <i className="fa fa-window-close" aria-hidden="true"></i>
	      </button>
	      <div className="selected-location-name">{props.locationInfo.name}</div>
	      <img className="location-image" src={props.locationInfo.image} />
	      <div className="selected-location-info">{props.locationInfo.long_description}</div>
	      <button className="add-location-to-favs-button">Add to favorites</button>
	     </div>
    </div>
  )
}

export default LocationDetailsDisplay;
