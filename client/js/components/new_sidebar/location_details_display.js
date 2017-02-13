import React from 'react';

const LocationDetailsDisplay = (props) => {

    return (
      <div>
        <button className="close-button" onClick={() => {props.selectById(null)}}>X</button>
        <div className="selected-location-name">{props.name}</div>
        <div className="selected-location-info">{props.info}</div>
        <button>Add to favorites</button>
      </div>
    )
}

export default LocationDetailsDisplay;
