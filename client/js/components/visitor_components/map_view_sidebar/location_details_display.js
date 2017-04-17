import React from 'react';

const LocationDetailsDisplay = (props) => {
  const selectLocalAndClearTags = (user) => {
    props.selectLocalUser(user);
  };

	if (!props.reviewInfo) {
    return <div />;
  }

  return (
    <div className="location-details-container">
      <button className="close-button" onClick={() => { props.selectLocationById(null); }}>
        <img role="presentation" src="/assets/images/close-button.svg" />
      </button>
      <div className="selected-location-info-container">
        <div className="selected-location-name">{props.locationName}</div>
        { props.reviewInfo.map(review => {
          return (
            <div key={review.id} className="location-details-user-container">
              <div className="user-info-for-review">
                <img className="user-image-review" role="presentation" src={review.user.image} />
                <button 
                  className="see-user-city" 
                  onClick={() => { selectLocalAndClearTags(review.user); }}
                >
                  {review.user.first_name}
                </button>
              </div>
              <div className="selected-location-info">
                <p className="bold">{review.short_description}</p>
                <p>{review.long_description}</p>
              </div>
            </div>
          );
        }) }
      </div>
    </div>
  );
};

export default LocationDetailsDisplay;
