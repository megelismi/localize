const mergeLocationsAndReviews = (reviews, locations) => {
  const locationIdxs = {}; 
  locations.forEach((location, idx) => {
    locationIdxs[location.id] = idx; 
  });
  reviews.forEach((review) => {
    const locationIdx = locationIdxs[review.location_id];  
    review.locationInfo = locations[locationIdx]; 
    delete review.location_id; 
  });
  return reviews; 
};

export default mergeLocationsAndReviews; 

