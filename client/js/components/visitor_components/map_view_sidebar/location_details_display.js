import React from 'react';

const LocationDetailsDisplay = (props) => {

	if (!props.reviewInfo) {
    return <div></div>
  }

  return (
 		<div className="location-details-container">
      <button className="close-button" onClick={() => {props.selectLocationById(null)}}>
        <i className="fa fa-window-close" aria-hidden="true"></i>
      </button>
      <div className="selected-location-name">{props.locationName}</div>
      { props.reviewInfo.map(review => {
				return (
          <div>
            <div className="user-info-for-review">
              <img className="user-image" src={review.user.image} />
              <p>{review.user.first_name}</p>
            </div>
  					{ review.image ? <img className="location-image" src={review.image} /> : null }
  	      	<div className="selected-location-info">{review.long_description}</div>
          </div>
				)
			}) }
    </div>
  )
}

export default LocationDetailsDisplay;
