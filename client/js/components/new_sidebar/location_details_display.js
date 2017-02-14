import React from 'react';

const LocationDetailsDisplay = (props) => {

  return (
    <div>
      <button className="close-button" onClick={() => {props.selectById(null)}}>X</button>
      <div className="selected-location-name">{props.locationInfo.name}</div>
      <img src={props.locationInfo.image} />
      <div className="selected-location-info">{props.locationInfo.long_description}</div>
      <button>Add to favorites</button>
    </div>
  )
}

export default LocationDetailsDisplay;
