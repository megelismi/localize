import React from 'react';

const LocationDetailsDisplay = (props) => {

	if (!props.reviewInfo) {
    return <div></div>
  }

  return (
 		<div className="location-details-container">
      <button className="close-button" onClick={() => {props.selectLocationById(null)}}>
        <img src="/assets/images/close-button.svg" />
      </button>
      <div className="selected-location-info-container">
        <div className="selected-location-name">{props.locationName}</div>
        { props.reviewInfo.map(review => {
  				return (
            <div className="location-details-user-container">
              <div className="user-info-for-review">
                <img className="user-image-review" src={review.user.image} />
                <p>{review.user.first_name}</p>
              </div>
    	      	<div className="selected-location-info">{review.long_description}</div>
            </div>
  				)
  			}) }
      </div>
    </div>
  )
}

export default LocationDetailsDisplay;
