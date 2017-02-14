import React from 'react';

const LocationDetailsDisplay = (props) => {

  return (
    <div className="sidebar-inner-container">
      <button className="close-button" onClick={() => {props.selectById(null)}}>X</button>
      <div className="selected-location-name">{props.locationInfo.name}</div>
      <img className="location-image" src={props.locationInfo.image} />
      <div className="selected-location-info">{props.locationInfo.long_description}</div>
      <button className="add-location-to-favs-button">Add to favorites</button>
    </div>
  )
}

export default LocationDetailsDisplay;
